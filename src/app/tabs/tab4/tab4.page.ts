import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActividadDetInscritoModalPage } from 'src/app/actividad-det-inscrito-modal/actividad-det-inscrito-modal.page';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  actividades: any[] = []; 
  Id_User: string = '';
  constructor(private dbService: DatabaseService, 
              private localS: LocalStorageService,
              private modalController: ModalController,
              private router:Router) { 

  } 
  
  ionViewWillEnter() {
    this.cargarActividades();
    this.cargarDatosUsuario();
  }

  ngOnInit() {
  }

  cargarActividades() {
    const user = this.localS.ObtenerUsuario('user'); 
    if (user && user.Id_User) { 
      const idUser = user.Id_User;

      this.dbService.getActividadesActivas(idUser).subscribe(
        (data) => {
          this.actividades = data;
          console.log('Actividades:', this.actividades);
        },
        (error) => {
          console.error('Error al obtener actividades activas:', error);
        }
      );
    } else {
      console.error('No se encontró el Id_User del usuario o el usuario no está autenticado.');
    }
  }

  async onCardClick(actividad: any) {
    console.log('Actividad clickeada:', actividad);
        
    const modal = await this.modalController.create({
      component: ActividadDetInscritoModalPage,
      componentProps: { actividad }
    });
        
    return await modal.present();
  }

  cargarDatosUsuario() {
    const usuario = this.localS.ObtenerUsuario('user');
    if (usuario) {
      this.Id_User=usuario.idUser
    } else {
      console.warn('No se encontró información del usuario en el LocalStorage.');
    }
  }

  IrHistorial(){
    this.router.navigate(['./historial']);
  }

  handleRefresh(event: any) {
    this.cargarActividades();
    event.target.complete();
  }
}
