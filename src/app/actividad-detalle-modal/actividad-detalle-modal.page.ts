import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-actividad-detalle-modal',
  templateUrl: './actividad-detalle-modal.page.html',
  styleUrls: ['./actividad-detalle-modal.page.scss'],
})
export class ActividadDetalleModalPage implements OnInit {

  @Input() actividad: any; 

  constructor(
    private modalController: ModalController,
    private databaseService: DatabaseService,
    private alertController: AlertController 
  ) { }
  
  ngOnInit() {
    console.log('Actividad recibida:', this.actividad); // Verificar los datos recibidos
  }

  inscribir() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const idUser = user.Id_User;

    this.databaseService.registerParticipante(this.actividad.Id_Actividad, idUser).subscribe(
      (response) => {
        console.log('Inscripción exitosa:', response);
        this.presentAlert('¡Muy Bien!','Te haz inscrito a la actividad.');
        this.volver(); // Cerrar modal
      },
      (error) => {
        console.error('Error al inscribirse:', error);
        this.presentAlert('¡Ups!','Al parecer ya estás inscrito.');
      }
    );
  }
  
  // Método para cerrar el modal
  volver() {
    this.modalController.dismiss(); // Cierra el modal
  }

  // Método que permite mostrar una alerta
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
