import { Component } from '@angular/core';
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
  comunaId: number = 0;
  fechaNacimiento: string = ''; // Agregado para la fecha de nacimiento
  AceptaCondiciones: boolean = false;
  showPassword: boolean = false;

  constructor(
    private router : Router,
    private dbService: DatabaseService, // Inyecta el servicio
    private alertController: AlertController
  ) {}

  // Método para alternar la visibilidad de la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Método que permite mostrar una alerta
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para el registro de usuario
  async SingUp() {
    // Validar si todos los campos están llenos
    if (!this.nombre || !this.rut || !this.mailuser || !this.celular || !this.password || !this.ConfirmPassword || !this.fechaNacimiento) {
      this.presentAlert('Faltan rellenar campos');
      return;
    }

    // Validar Nombre
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,50}$/;
    if (!nameRegex.test(this.nombre)) {
      this.presentAlert('Ingrese su nombre correctamente.');
      return;
    }

    // Validar el rut
    const rutRegex = /^\d{7,8}-[kK\d]$/;
    if (!rutRegex.test(this.rut)) {
      this.presentAlert('Ingrese un RUT válido.');
      return;
    }

    // Validar el formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|cl)$/i;
    if (!emailRegex.test(this.mailuser)) {
      this.presentAlert('El correo es inválido.');
      return;
    }

    // Validar el formato del número de celular
    const phoneRegex = /^\+569\d{8}$/;
    if (!phoneRegex.test(this.celular)) {
      this.presentAlert('Número de celular inválido.');
      return;
    }

    // Validar la contraseña
    if (this.password.length < 4 || this.password.length > 8) {
      this.presentAlert('La contraseña debe tener mínimo 4 caracteres y máximo 8.');
      return;
    }

    // Validar que ambas contraseñas sean iguales
    if (this.password !== this.ConfirmPassword) {
      this.presentAlert('Las contraseñas no coinciden.');
      return;
    }

    // Validar comuna
    if (!this.comunaId) {
      this.presentAlert('Debe seleccionar su comuna.');
      return;
    }

    // Validar fecha de nacimiento
    if (!this.fechaNacimiento) {
      this.presentAlert('Debe ingresar su fecha de nacimiento.');
      return;
    }

    // Validar si los términos y condiciones han sido aceptados
    if (!this.AceptaCondiciones) {
      this.presentAlert('Debe aceptar los términos y condiciones.');
      return;
    }

    try {
      // Llamada al servicio para registrar al usuario
      await this.dbService.registerUser(this.rut, this.nombre, this.mailuser, this.password, this.comunaId, this.fechaNacimiento).toPromise();
      this.presentAlert('Usuario registrado con éxito.');
      this.router.navigate(['./login']);
    } catch (error) {
      this.presentAlert('Error al registrar el usuario.');
    }
  }
}
