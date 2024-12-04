import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DatabaseService } from 'src/app/database.service';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ActividadAnfitrionDetallePage } from '../actividad-anfitrion-detalle/actividad-anfitrion-detalle.page';

@Component({
  selector: 'app-actividadanfitrion',
  templateUrl: './actividadanfitrion.page.html',
  styleUrls: ['./actividadanfitrion.page.scss'],
})
export class ActividadanfitrionPage implements OnInit {
  actividades: any[] = [];
  actividadesFiltradas: any[] = [];
  categorias: string[] = [];
  filtroCategoria: string = 'Todas';

  @Input() actividad: any; // Recibe la actividad desde el modal
  jugadoresInscritos: number | undefined;

  constructor(
    private localS: LocalStorageService,
    private dbService: DatabaseService,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController
  ) { }

  ionViewWillEnter() {
    this.cargarActividades();
  }

  ngOnInit() {
  }

  cargarActividades() {
    const user = this.localS.ObtenerUsuario('user');
    const idUser = user?.Id_User; // Cambiamos para obtener el Id_User
  
    // Llamar al servicio con Id_User
    this.dbService.getActividadesAnfitrion(idUser).subscribe(
      (data) => {
        this.actividades = data; // Asignar directamente las actividades recibidas
        this.actividadesFiltradas = [...this.actividades]; // Copiar actividades para filtrar
  
        // Generar categorías únicas
        this.categorias = ['Todas', ...new Set(this.actividades.map((act) => act.Nom_SubCategoria || 'Sin Categoría'))];
  
        console.log('Actividades cargadas:', this.actividades);
        console.log('Categorías disponibles:', this.categorias);
  
        // Asegurar imágenes por defecto
        this.actividades.forEach((actividad) => {
          actividad.Url = actividad.Url || 'assets/default-image.jpg';
        });
      },
      (error) => {
        console.error('Error al obtener actividades:', error);
        this.presentAlert('Error', 'No se pudieron cargar las actividades.');
      }
    );
  }
  

  filtrarActividades() {
    console.log('Filtro seleccionado:', this.filtroCategoria);

    if (this.filtroCategoria === 'Todas') {
      this.actividadesFiltradas = [...this.actividades];
    } else {
      this.actividadesFiltradas = this.actividades.filter(
        (act) => act.Nom_SubCategoria.trim().toLowerCase() === this.filtroCategoria.trim().toLowerCase()
      );
    }

    console.log('Actividades filtradas:', this.actividadesFiltradas);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  handleRefresh(event: any) {
    this.cargarActividades();
    event.target.complete();
  }

  async onCardClick(actividad: any) {
    console.log('Actividad clickeada:', actividad);
        
    const modal = await this.modalController.create({
      component: ActividadAnfitrionDetallePage,
      componentProps: { actividad }
    });
        
    return await modal.present();
  }

  Volver(){
    this.router.navigate(['./tabs/tab4']);
  }

}
