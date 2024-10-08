import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nombre: string = '';
  rut: string = '';
  mailuser: string = '';
  celular: string = '';
  password: string = '';
  ConfirmPassword: string = '';
  showPassword = false;
  AceptaCondiciones: boolean = false;

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {}

  // Método que permite mostrar una alerta.
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  //Método para mostrar la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword; // Alternar entre mostrar/ocultar
  }

  // Método de validación del formulario
  SingUp() {
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
      this.presentAlert('La contraseña debe tener mínimo 8 carácteres y máximo 8.');
      return;
    }

    // Validar que ambas contraseñas sean iguales
    if (this.password !== this.ConfirmPassword) {
      this.presentAlert('Las contraseñas no coinciden.');
      return;
    }

    // Validar si los términos y condiciones ha sido aceptado
    if (!this.AceptaCondiciones) {
      this.presentAlert('Debe aceptar los términos y condiciones.');
      return;
    }

    // Si todo está correcto, navega a la página de login
    this.router.navigate(['./login']);
    this.nombre = '';
    this.rut = '';
    this.mailuser = '';
    this.celular = '';
    this.password = '';
    this.ConfirmPassword = '';
    this.AceptaCondiciones = false;
  }
}
