import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { AlertController } from '@ionic/angular';

declare const google: any;

@Component({
  selector: 'app-actividad-detalle-modal',
  templateUrl: './actividad-detalle-modal.page.html',
  styleUrls: ['./actividad-detalle-modal.page.scss'],
})
export class ActividadDetalleModalPage implements OnInit {

  @Input() actividad: any;
  jugadoresInscritos: number | undefined; 

  constructor(
    private modalController: ModalController,
    private databaseService: DatabaseService,
    private alertController: AlertController 
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

  inscribir() {
    if (this.jugadoresInscritos !== undefined && this.actividad?.Cantidad_MaxJugador !== undefined) {
      if (this.jugadoresInscritos >= this.actividad.Cantidad_MaxJugador) {
        this.presentAlert('Cupo completo', 'No puedes inscribirte porque el cupo de la actividad ya está lleno.');
        return;
      }
    }
  
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const idUser = user.Id_User;
  
    this.databaseService.registerParticipante(this.actividad.Id_Actividad, idUser).subscribe(
      (response) => {
        console.log('Inscripción exitosa:', response);
        this.presentAlert('¡Muy Bien!', 'Te haz inscrito a la actividad.');
        this.volver();
      },
      (error) => {
        console.error('Error al inscribirse:', error);
        this.presentAlert('¡Ups!', 'Al parecer ya estás inscrito.');
      }
    );
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
