import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from '../database.service'; // Asegúrate de que esta ruta sea correcta

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
    private navCtrl: NavController,
    private alertController: AlertController,
    private dbService: DatabaseService // Inyecta tu servicio
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
      // Llama al servicio de login
      const response = await this.dbService.loginUser(this.mailuser, this.password).toPromise();

      if (response) {
        // Redirige al usuario a la página principal si el login es exitoso
        this.navCtrl.navigateRoot('./tabs/tab1');
      } else {
        this.presentAlert('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (error) {
      this.presentAlert('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  }

  // Método para la recuperación de contraseña
  recover() {
    // Implementa la lógica de recuperación de contraseña aquí
    this.presentAlert('Funcionalidad de recuperación de contraseña no implementada.');
  }

  // Método para navegar a la página de registro
  signup() {
    this.navCtrl.navigateForward('/register');
  }

  // Método para abrir o cerrar la alerta
  setAlertOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
