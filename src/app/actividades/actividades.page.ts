import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/database.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {
  nomActividad: string = '';
  descActividad: string = '';
  direccionActividad: string = '';
  horaActividad: string = ''; // Hora de inicio
  horaTerminoActividad: string = ''; // Hora de término

  Id_Comuna: number = 0;
  Id_Anfitrion: number = 0;

  categoriaId: any[] = [];
  subcategoriaId: any[] = [];
  categoriaSeleccionada: number = 0;
  subcategoriaSeleccionada: number = 0;

  MaxjugadorId: any[] = [];
  maxJugadores: number = 0;

  constructor(
    private alertController: AlertController,
    private dbService: DatabaseService,
    private router: Router,
    private localS: LocalStorageService
  ) {}

  ngOnInit() {
    // Obtengo las categorías y cantidades de jugadores
    this.dbService.getCategoria().subscribe(
      (data) => {
        this.categoriaId = data;
        console.log('Categorías recibidas:', data);
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );

    this.dbService.getMaxJugador().subscribe(
      (data) => {
        this.MaxjugadorId = data;
        console.log('Cantidad jugadores recibidas:', data);
      },
      (error) => {
        console.error('Error al obtener cantidad jugadores:', error);
      }
    );
  }

  cargarCategorias() {
    console.log('Categoría seleccionada:', this.categoriaSeleccionada);

    this.dbService.getSubCategoria(this.categoriaSeleccionada).subscribe(
      (data) => {
        this.subcategoriaId = data;
        console.log('Datos de Subcategorías recibidos:', data);
      },
      (error) => {
        console.error('Error al obtener Subcategorías:', error);
      }
    );
  }

  // Método que permite mostrar una alerta
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async crearActividad() {
    if (!this.nomActividad || !this.descActividad || !this.direccionActividad || this.maxJugadores <= 0 || !this.horaActividad || !this.horaTerminoActividad) {
      this.presentAlert('Error', 'Por favor, completa todos los campos correctamente.');
      return;
    }

    // Obtener la fecha de inicio (puedes ajustar esto según necesites)
    const fechaInicioActividad = new Date();
    const [horaInicio, minutosInicio] = this.horaActividad.split(':').map(Number);
    fechaInicioActividad.setHours(horaInicio, minutosInicio, 0);

    const [horaTermino, minutosTermino] = this.horaTerminoActividad.split(':').map(Number);
    const fechaTerminoActividad = new Date(fechaInicioActividad); // Clonamos la fecha de inicio
    fechaTerminoActividad.setHours(horaTermino, minutosTermino, 0);

    const fechaTerminoActividadString = fechaTerminoActividad.toISOString().slice(0, 19).replace('T', ' '); // Formato YYYY-MM-DD HH:mm:ss

    try {
      const usuario = this.localS.ObtenerUsuario('user');
      if (usuario) {
        this.Id_Comuna = usuario.Id_Comuna;
        this.Id_Anfitrion = usuario.Id_User;
        console.log('Id_Comuna asignada:', this.Id_Comuna);
        console.log('Id_Anfitrion asignada:', this.Id_Anfitrion);
      } else {
        console.warn('No se encontró información del usuario en el LocalStorage.');
      }

      // Llamada para registrar la actividad
      await this.dbService.registerActividad(
        this.nomActividad,
        this.descActividad,
        this.direccionActividad,
        this.maxJugadores,
        fechaInicioActividad.toISOString().slice(0, 19).replace('T', ' '), // Convertir a formato de cadena si es necesario
        fechaTerminoActividadString,   
        this.Id_Comuna,
        this.subcategoriaSeleccionada,
        this.Id_Anfitrion
      ).toPromise();

      this.presentAlert('¡Felicidades!', 'Actividad registrada con éxito.');

      // Limpiar los campos
      this.nomActividad = '';
      this.descActividad = '';
      this.direccionActividad = '';
      this.maxJugadores = 0;
      this.horaActividad = '';
      this.horaTerminoActividad = ''; 
      this.Id_Comuna = 0;
      this.subcategoriaSeleccionada = 0;
      this.Id_Anfitrion = 0;
      this.router.navigate(['./tabs/tab2']);
    } catch (error) {
      this.presentAlert('Error', 'No se pudo registrar la actividad.');
      console.log('Preparando datos para crear actividad:', {
        nomActividad: this.nomActividad,
        descActividad: this.descActividad,
        direccionActividad: this.direccionActividad,
        maxJugadores: this.maxJugadores,
        horaActividad: this.horaActividad,
        horaTerminoActividad: this.horaTerminoActividad,
        Id_Comuna: this.Id_Comuna,
        subcategoriaSeleccionada: this.subcategoriaSeleccionada,
        Id_Anfitrion: this.Id_Anfitrion,
      });
    }
  }

  //este para volver a tab2
  volver() {
    this.router.navigate(['/tabs/tab2']); 
  }
}
