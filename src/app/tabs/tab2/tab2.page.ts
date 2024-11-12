import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DatabaseService } from 'src/app/database.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ActividadDetalleModalPage } from '../../actividad-detalle-modal/actividad-detalle-modal.page';

@Component({
  selector: 'app-tab2', 
  templateUrl: './tab2.page.html', 
  styleUrls: ['./tab2.page.scss'], 
})
export class Tab2Page implements OnInit, OnDestroy {
  actividades: any[] = [];
  coloresActividades: string[] = [];
  colors = [
    'col-card1', 'col-card2', 'col-card3', 'col-card4', 'col-card5'
  ];
  private intervalId: any;

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

    this.intervalId = setInterval(() => {
      this.cargarActividades();
    }, 30000); // 30 segundos
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cargarActividades() {
    const user = this.localS.ObtenerUsuario('user');
    const idComuna = user?.Id_Comuna;

    this.dbService.getActividades(idComuna).subscribe(
      (data) => {
        this.actividades = data;
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

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  enviarPagAct() {
    this.router.navigate(['./actividades']);
  }

  async onCardClick(actividad: any) {
    console.log('Actividad clickeada:', actividad);
        
    const modal = await this.modalController.create({
      component: ActividadDetalleModalPage,
      componentProps: { actividad }
    });
        
    return await modal.present();
  }

  handleRefresh(event: any) {
    this.cargarActividades();
    event.target.complete();
  }
}
