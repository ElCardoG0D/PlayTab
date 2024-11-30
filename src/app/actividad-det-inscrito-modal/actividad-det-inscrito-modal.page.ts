import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';

declare const google: any;

@Component({
  selector: 'app-actividad-det-inscrito-modal',
  templateUrl: './actividad-det-inscrito-modal.page.html',
  styleUrls: ['./actividad-det-inscrito-modal.page.scss'],
})
export class ActividadDetInscritoModalPage implements OnInit {

  @Input() actividad: any;
  jugadoresInscritos: number | undefined; 

  actividades: any[] = []; 
  Id_User: string = '';

  constructor(
    private modalController: ModalController,
    private databaseService: DatabaseService,
    private alertController: AlertController,
    private localS : LocalStorageService
  ) { }

  ngOnInit() {
    console.log('Actividad recibida:', this.actividad);
    this.databaseService.getJugadores(this.actividad.Id_Actividad).subscribe(
      (response) => {
        this.jugadoresInscritos = response[0]['COUNT(Id_Actividad)'];
        console.log('Jugadores inscritos:', this.jugadoresInscritos);
      },
      (error) => {
        console.error('Error al obtener jugadores inscritos:', error);
      }
    );
  }

  ngAfterViewInit() {
    // Cargar el script de Google Maps antes de inicializar el mapa
    this.loadGoogleMapsScript().then(() => {
      if (this.actividad?.Direccion_Actividad) {
        this.loadMap(this.actividad.Direccion_Actividad);
      }
    }).catch((error) => {
      console.error('Error al cargar Google Maps:', error);
    });
  }

  private loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.databaseService.getGoogleMapsKey().subscribe({
        next: (data) => {
          const apiKey = data.apiKey;
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
          script.async = true;
          script.defer = true;
          script.onload = () => resolve();
          script.onerror = () => reject('Error loading Google Maps script.');
          document.head.appendChild(script);
        },
        error: (err) => reject(err),
      });
    });
  }

  loadMap(address: string) {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results: any, status: string) => {
      if (status === 'OK' && results[0]) {
        const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
          zoom: 15,
          center: results[0].geometry.location,
        });

        // Coloca un marcador en el mapa
        new google.maps.Marker({
          position: results[0].geometry.location,
          map,
          title: address,
        });
      } else {
        console.error('Error al cargar la ubicación:', status);
      }
    });
  }

  eliminarUsuarioDeActividad(Id_Actividad: number) {
    const user = this.localS.ObtenerUsuario('user');
    if (user && user.Id_User) {
      const idUser = user.Id_User;

      this.databaseService.eliminarUsuarioDeActividad(idUser, Id_Actividad).subscribe(
        (response) => {
          this.presentAlert('Eliminado', 'Te haz desuscrito de la actividad.');
          this.volver();
          this.actividades = this.actividades.filter(actividad => actividad.Id_Actividad !== Id_Actividad);
        },
        (error) => {
          console.error('Error al eliminar al usuario de la actividad:', error);
        }
      );
    } else {
      console.error('No se encontró el Id_User del usuario o el usuario no está autenticado.');
    }
  }

  volver() {
    this.modalController.dismiss(); 
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
