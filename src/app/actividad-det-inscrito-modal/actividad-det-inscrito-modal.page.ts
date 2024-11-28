import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';


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
