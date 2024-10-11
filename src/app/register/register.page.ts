import { Component } from '@angular/core';
import { DatabaseService } from '../database.service'; // Importa tu servicio
import { NavController } from '@ionic/angular';
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
  AceptaCondiciones: boolean = false;
  showPassword: boolean = false;

  constructor(
    private dbService: DatabaseService, // Inyecta el servicio
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Método que permite mostrar una alerta.
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
    if (!this.nombre || !this.rut || !this.mailuser || !this.celular || !this.password || !this.ConfirmPassword) {
      this.presentAlert('Faltan rellenar campos');
      return;
    }

    // Validar Nombre
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,30}$/;
    if (!nameRegex.test(this.nombre)) {
      this.presentAlert('Ingrese su nombre correctamente.');
      return;
    }

    // Validar el rut
    const rutRegex = /^\d{7,8}-[kK\d]$/;
    if (!rutRegex.test(this.rut)) {
      this.presentAlert('Ingrese un rut válido.');
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
      this.presentAlert('La contraseña debe tener mínimo 4 carácteres y máximo 8.');
      return;
    }

    // Validar que ambas contraseñas sean iguales
    if (this.password !== this.ConfirmPassword) {
      this.presentAlert('Las contraseñas no coinciden.');
      return;
    }

    if (!this.comunaId) {
      this.presentAlert('Debe Seleccionar su comuna');
      return;
    }

    // Validar si los términos y condiciones ha sido aceptado
    if (!this.AceptaCondiciones) {
      this.presentAlert('Debe aceptar los términos y condiciones.');
      return;
    }

    try {
      // Llamada al servicio para registrar al usuario
      await this.dbService.registerUser(this.rut, this.nombre, this.mailuser, this.password, this.comunaId).toPromise();
      this.presentAlert('Usuario registrado con éxito.');
      return;

    } catch (error) {
      this.presentAlert('Error al registrar el usuario.');
      return;
    }
  }
  
}
