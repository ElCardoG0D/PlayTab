import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DatabaseService } from 'src/app/database.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular'; // Importa ModalController
import { ActividadDetalleModalPage } from '../../actividad-detalle-modal/actividad-detalle-modal.page';

@Component({
  selector: 'app-tab2', 
  templateUrl: './tab2.page.html', 
  styleUrls: ['./tab2.page.scss'], 
})
export class Tab2Page implements OnInit {
  actividades: any[] = []; // Almacenar las actividades
  coloresActividades: string[] = []; // almacenar los colores
  colors = [
    'col-card1', 'col-card2', 'col-card3', 'col-card4', 'col-card5'
  ];

  constructor(
    private localS: LocalStorageService,
    private dbService: DatabaseService,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    const user = this.localS.ObtenerUsuario('user');
    console.log('Usuario:', user);
    this.cargarActividades();
  }
  cargarActividades() {
    const user = this.localS.ObtenerUsuario('user');
    
    // Extraer Id_Comuna del usuario
    const idComuna = user?.Id_Comuna;

    this.dbService.getActividades(idComuna).subscribe(
      (data) => {
        this.actividades = data;
  
        // Asignar colores a todas las actividades
        this.coloresActividades = this.actividades.map(() => this.getRandomColor());
  
        this.actividades.forEach(actividad => {
          actividad.Url = actividad.Url || 'assets/default-image.jpg';
        });
        
        console.log('Actividades:', this.actividades); 
        console.log('Colores asignados:', this.coloresActividades);
      },
      (error) => {
        console.error('Error al obtener actividades:', error);
        this.presentAlert('Error', 'No se pudieron cargar las actividades.');
      }
    );
  }

  // Método para mostrar una alerta
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para obtener un color aleatorio
  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  // Navegar a la página de actividades
  enviarPagAct() {
    this.router.navigate(['./actividades']);
  }
  // Método para abrir el modal al hacer clic en una tarjeta
  async onCardClick(actividad: any) {
    console.log('Actividad clickeada:', actividad);
        
    const modal = await this.modalController.create({
      component: ActividadDetalleModalPage, // Especifica el componente del modal
      componentProps: {
      actividad: actividad // Pasar los detalles de la actividad al modal
      }
      });
        
    return await modal.present();
    }
    
}
