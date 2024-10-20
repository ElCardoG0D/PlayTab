import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service'; // Importa tu servicio
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  nombre: string = '';  // Inicializa como cadena vacía
  rut: string = '';
  mailuser: string = '';
  celular: string = '';
  password: string = '';
  ConfirmPassword: string = '';
  regionId: any[] = [];   
  comunaId: any[] = []; 
  region: number = 0; 
  comuna: number = 0; 
  fechaNacimiento: string = ''; // Agregado para la fecha de nacimiento
  showCalendar: boolean = false;
  AceptaCondiciones: boolean = false;
  showPassword: boolean = false;

  constructor(
    private router : Router,
    private dbService: DatabaseService, // Inyecta el servicio
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Obtener todas las regiones al cargar el componente
    this.dbService.getRegiones().subscribe((data) => {
      this.regionId = data; 
    });
  }

  onRegionChange() {
    console.log('Región seleccionada:', this.region);
  
    this.dbService.getComunasPorRegion(this.region).subscribe((data) => {
      this.comunaId = data;
      console.log('Datos de comunas recibidos:', data); // Verifica qué campos estás recibiendo
    },
    (error) => {
      console.error('Error al obtener comunas:', error);
    });
  }
  

  // Método para alternar la visibilidad de la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
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

  // Método para el registro de usuario
  async SingUp() {
    // Validar si todos los campos están llenos
    if (!this.nombre || !this.rut || !this.mailuser || !this.celular || !this.password || !this.ConfirmPassword || !this.fechaNacimiento) {
      this.presentAlert('Error','Faltan rellenar campos.');
      return;
    }

    // Validar Nombre
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,50}$/;
    if (!nameRegex.test(this.nombre)) {
      this.presentAlert('Error', 'Ingrese su nombre correctamente.');
      return;
    }

    // Validar el rut
    const rutRegex = /^\d{7,8}-[kK\d]$/;
    if (!rutRegex.test(this.rut)) {
      this.presentAlert('Error','Ingrese un RUT válido.');
      return;
    }

    // Validar el formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|cl)$/i;
    if (!emailRegex.test(this.mailuser)) {
      this.presentAlert('Error','El correo es inválido.');
      return;
    }

    // Validar el formato del número de celular
    const phoneRegex = /^\+569\d{8}$/;
    if (!phoneRegex.test(this.celular)) {
      this.presentAlert('Error','Número de celular inválido.');
      return;
    }

    // Validar la contraseña
    if (this.password.length < 4 || this.password.length > 8) {
      this.presentAlert('Error','La contraseña debe tener mínimo 4 caracteres y máximo 8.');
      return;
    }

    // Validar que ambas contraseñas sean iguales
    if (this.password !== this.ConfirmPassword) {
      this.presentAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Validar comuna
    if (!this.regionId) {
      this.presentAlert('Error','Debe seleccionar una región.');
      return;
    }

    // Validar comuna
    if (!this.comuna) {
      this.presentAlert('Error','Debe seleccionar una comuna.');
      return;
    }

    const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/; // Regex para formato YYYY-MM-DD
    if (!this.fechaNacimiento.match(regex)) {
      this.presentAlert('Error', 'Por favor, Ingrese una fecha valida.');
    }

    // Validar fecha de nacimiento
    if (!this.fechaNacimiento) {
      this.presentAlert('Error','Debe ingresar su fecha de nacimiento.');
      return;
    }

    // Validar si los términos y condiciones han sido aceptados
    if (!this.AceptaCondiciones) {
      this.presentAlert('Error','Debe aceptar los términos y condiciones.');
      return;
    }

    try {
      // Llamada al servicio para registrar al usuario
      await this.dbService.registerUser(this.rut, this.nombre, this.mailuser, this.password, this.celular, this.comuna, this.fechaNacimiento).toPromise();
      this.presentAlert('¡Felicidades!','Usuario registrado con éxito.');
      this.rut = '';
      this.nombre = '';
      this.mailuser = '';
      this.celular= '';
      this.password = '';
      this.ConfirmPassword = '';
      this.region = 0;
      this.comuna = 0;
      this.fechaNacimiento = '';
      this.router.navigate(['./login']);
    } catch (error) {
      this.presentAlert('Error', 'No se pudo registrar el usuario.');
    }
  }
}
