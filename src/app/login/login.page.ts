import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service'; // Asegúrate de que esta ruta sea correcta
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  mailuser: string = '';
  password: string = '';
  showPassword: boolean = false;
  rememberMe: boolean = false;
  isAlertOpen: boolean = false;
  alertMessage: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private dbService: DatabaseService, // Inyecta tu servicio
    private localS : LocalStorageService
  ) {}

  // Método para alternar la visibilidad de la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Método para mostrar una alerta
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para iniciar sesión
  async login() {
  if (!this.mailuser || !this.password) {
    this.presentAlert('Por favor, complete todos los campos.');
    return;
  }

  try {
    const response: any = await this.dbService.loginUser(this.mailuser, this.password).toPromise();
    console.log('Respuesta recibida:', response); // Verifica la estructura completa de la respuesta

    if (response && response.user) {
      // Guardar los datos en localStorage
      this.localS.GuardarUsuario('user', response.user);
      this.router.navigate(['./tabs/tab1']);
    } else {
      this.presentAlert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  } catch (error: any) {
    if (error.status === 401) {
      this.presentAlert('Credenciales incorrectas o el usuario no existe en PlayTab.');
    } else {
      this.presentAlert('Error del servidor. Por favor intenta de nuevo más tarde :(');
    }
  }
}

  // Método para la recuperación de contraseña
  recover() {
    // Implementa la lógica de recuperación de contraseña aquí
    this.router.navigate(['./recover-pw']);
  }

  // Método para navegar a la página de registro
  signup() {
    this.router.navigate(['./register']);
  }

  // Método para abrir o cerrar la alerta
  setAlertOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
