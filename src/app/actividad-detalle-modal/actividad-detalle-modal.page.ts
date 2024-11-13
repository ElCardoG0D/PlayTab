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
