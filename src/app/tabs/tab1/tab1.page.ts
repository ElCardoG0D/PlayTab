import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DatabaseService } from 'src/app/database.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  actividades: any[] = []; // Almacenar las actividades
  coloresActividades: string[] = []; // Array para almacenar los colores

  colors = [
    'col-card1', 'col-card2', 'col-card3', 'col-card4', 'col-card5'
  ];

  constructor(
    private localS: LocalStorageService,
    private dbService: DatabaseService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const user = this.localS.ObtenerUsuario('user');
    console.log('Usuario:', user);
    this.cargarActividades(); // Cargar actividades
  }

  cargarActividades() {
    this.dbService.getActividades().subscribe(
      (data) => {
        this.actividades = data;
        this.coloresActividades = this.actividades.map(() => this.getRandomColor());
        console.log('Colores asignados:', this.coloresActividades); // Verifica que los colores están siendo generados
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
}
