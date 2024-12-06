import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividad-anfitrion-detalle',
  templateUrl: './actividad-anfitrion-detalle.page.html',
  styleUrls: ['./actividad-anfitrion-detalle.page.scss'],
})
export class ActividadAnfitrionDetallePage implements OnInit {

  @Input() actividad: any;
  actividades: any[] = [];
  jugadoresInscritos: number=0; 

  MaxjugadorId: any[] = [];
  maxJugadores: number = 0;

  usuariosInscritos: any[] = [];
  asistencias: any[] = [
    { id: 800, tipo: 'Presente' },
    { id: 900, tipo: 'Ausente' },
  ];

  constructor(
    private router : Router,
    private modalController: ModalController,
    private databaseService: DatabaseService,
    private alertController: AlertController,
    private localS : LocalStorageService
  ) { }

  ngOnInit() {
    console.log('Actividad recibida:', this.actividad);

    if (this.actividad.Id_Categoria === 1000) {
      this.actividad.isCategoriaDisabled = true;
    } else {
      this.actividad.isCategoriaDisabled = false;
    }

    this.databaseService.getJugadores(this.actividad.Id_Actividad).subscribe(
      (response) => {
        this.jugadoresInscritos = response[0]?.['COUNT(Id_Actividad)'] ?? 0;
        console.log('Jugadores inscritos:', this.jugadoresInscritos);
      },
      (error) => {
        console.error('Error al obtener jugadores inscritos:', error);
      }
    );

    this.databaseService.getMaxJugador().subscribe(
      (data) => {
        this.MaxjugadorId = data;
        console.log('Opciones MaxJugador cargadas:', this.MaxjugadorId);
      },
      (error) => {
        console.error('Error al obtener cantidad jugadores:', error);
      }
    );

    this.databaseService.getUsuariosInscritos(this.actividad.Id_Actividad).subscribe(
      (response) => {
        this.usuariosInscritos = response;
        console.log('Usuarios inscritos:', this.usuariosInscritos);
      },
      (error) => {
        console.error('Error al obtener usuarios inscritos:', error);
      }
    );
  }

  actualizarActividad() {
    const actividadActualizada = {
      Id_Actividad: this.actividad.Id_Actividad,
      Desc_Actividad: this.actividad.Desc_Actividad,
      Direccion_Actividad: this.actividad.Direccion_Actividad,
      Id_MaxJugador: this.actividad.Id_MaxJugador,
    };
  
    console.log('Datos enviados para actualizar:', actividadActualizada);
  
    this.databaseService.updateActividad(
      actividadActualizada.Id_Actividad,
      actividadActualizada.Desc_Actividad,
      actividadActualizada.Direccion_Actividad,
      actividadActualizada.Id_MaxJugador
    ).subscribe(
      () => {
        this.presentAlert('Éxito', 'La actividad se actualizó correctamente.');
        this.modalController.dismiss(); // Cierra el modal después de la actualización
      },
      (error) => {
        console.error('Error al actualizar la actividad:', error);
        this.presentAlert('Error', 'No se pudo actualizar la actividad. Inténtalo nuevamente.');
      }
    );
  }

  async borrarActividad() {
    const alert = await this.alertController.create({
      header: 'Eliminación de actividad',
      message: '¿Estás seguro de que deseas eliminar esta actividad? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Si',
          handler: () => {
            this.databaseService.deleteActividad(this.actividad.Id_Actividad).subscribe(
              () => {
                this.presentAlert('Éxito', 'La actividad ha sido eliminada.');
                this.modalController.dismiss(); // Cierra el modal después de eliminar la actividad
              },
              (error) => {
                console.error('¡Ups!', error);
                this.presentAlert('Error', 'No se pudo eliminar la actividad. Inténtalo nuevamente.');
              }
            );
          },
        },
      ],
    });
  
    await alert.present();
  }

  actualizarAsistencia(Id_User: number, Id_Actividad: number, Id_Asistencia: number) {
    this.databaseService.actualizarAsistencia(Id_User, Id_Actividad, Id_Asistencia).subscribe(
      () => {
        this.presentAlert('Éxito', 'La asistencia se actualizó correctamente.');
      },
      (error) => {
        console.error('Error al actualizar asistencia:', error);
        this.presentAlert('Error', 'No se pudo actualizar la asistencia. Inténtalo nuevamente.');
      }
    );
  }
  

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  volver() {
    this.modalController.dismiss(); 
  }
}
