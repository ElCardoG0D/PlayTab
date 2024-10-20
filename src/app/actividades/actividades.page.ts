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
  nomActividad: string='';
  descActividad: string='';
  direccionActividad: string='';
  horaActividad: string='';

  Id_Comuna: number=0;
  Id_Anfitrion: number=0;

  categoriaId: any[] = [];
  subcategoriaId: any[] = [];
  categoriaSeleccionada: number = 0;
  subcategoriaSeleccionada: number = 0;

  MaxjugadorId: any[] = [];
  maxJugadores: number = 0;

  constructor(private alertController: AlertController, private dbService: DatabaseService, private router: Router, private localS : LocalStorageService) { }

  ngOnInit() {
    // Obtengo los categorias y cantidades jugadores *************************************
    this.dbService.getCategoria().subscribe((data) => {
      this.categoriaId = data;
      console.log('Categorías recibidas:', data); // Para verificar qué datos estás recibiendo
    },
    (error) => {
      console.error('Error al obtener categorías:', error);
    });

    this.dbService.getMaxJugador().subscribe((data) => {
      this.MaxjugadorId = data;
      console.log('Cantidad jugadores recibidas:', data); // Para verificar qué datos estás recibiendo
    },
    (error) => {
      console.error('Error al obtener cantidad jugadores:', error);
    });
  }

  cargarCategorias() {
    console.log('Categoria seleccionada:', this.categoriaSeleccionada);
  
    this.dbService.getSubCategoria(this.categoriaSeleccionada).subscribe((data) => {
      this.subcategoriaId = data;
      console.log('Datos de Subcategorias recibidos:', data); // Verifica qué campos estás recibiendo
    },
    (error) => {
      console.error('Error al obtener Subcategorias:', error);
    });
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

  async crearActividad() {
    // Validar si todos los campos están llenos
    if (!this.nomActividad || !this.direccionActividad || !this.horaActividad) {
      this.presentAlert('Error','Faltan rellenar campos.');
      return;
    }

    //1. Ingresar y validar la hora.
    const fechaActual = new Date();  // Obtener la fecha actual del sistema
  
    // Extraer año, mes y día de la fecha actual
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const day = String(fechaActual.getDate()).padStart(2, '0');
  
    // Combinar la fecha actual con la hora ingresada por el usuario
    const fechaHoraUsuarioString = `${year}-${month}-${day} ${this.horaActividad}:00`;
    
    // Crear un objeto Date con la fecha y hora ingresada
    const fechaHoraUsuario = new Date(fechaHoraUsuarioString);
  
    // Validar que la fecha y hora ingresadas sean mayores que la actual
    if (fechaHoraUsuario <= fechaActual) {
      this.presentAlert('Error', 'La hora ingresada debe ser mayor a la hora actual.');
      return;
    }

    // 2. Validar campos de Categoria y Subcategoria
    // Validar comuna
    if (!this.categoriaId) {
      this.presentAlert('Error','Debe seleccionar una categoría.');
      return;
    }

    // Validar comuna
    if (!this.subcategoriaSeleccionada) {
      this.presentAlert('Error','Debe seleccionar una sub categoría.');
      return;
    }

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

      // Llamada al servicio para registrar al usuario
      await this.dbService.registerActividad(this.nomActividad,this.descActividad,this.direccionActividad,this.maxJugadores,fechaHoraUsuarioString,this.Id_Comuna,this.subcategoriaSeleccionada,this.Id_Anfitrion).toPromise();
      this.presentAlert('¡Felicidades!','Usuario registrado con éxito.');
      this.nomActividad = '';
      this.descActividad='';
      this.direccionActividad = '';
      this.maxJugadores=0;
      this.horaActividad = '';
      this.Id_Comuna = 0;
      this.subcategoriaSeleccionada = 0;
      this.Id_Anfitrion=0;
      this.router.navigate(['./tabs/tab2']);
    } catch (error) {
      this.presentAlert('Error', 'No se pudo registrar la actividad.');
      console.log('Preparando datos para crear actividad:', {
        nomActividad: this.nomActividad,
        descActividad: this.descActividad,
        direccionActividad: this.direccionActividad,
        maxJugadores: this.maxJugadores,
        horaActividad: fechaHoraUsuarioString,
        Id_Comuna: this.Id_Comuna,
        subcategoriaSeleccionada: this.subcategoriaSeleccionada,
        Id_Anfitrion: this.Id_Anfitrion
      });  
    }
    
  }

}
