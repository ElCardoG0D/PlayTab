import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  nombre: string = '';
  rut: string = '';
  mailuser: string = '';
  celular: string = '';
  password: string = '';
  ConfirmPassword: string = '';
  AceptaCondiciones: boolean = false;
  showPassword: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

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

    try {
      // Llamada al servicio Firebase para registrar al usuario
      const userCredential = await this.firebaseService.signup(this.mailuser, this.password, {
        nombre: this.nombre,
        rut: this.rut,
        celular: this.celular,
        email: this.mailuser,
      });

      // Ahora puedes acceder al UID
      const uid = userCredential.user.uid;

      const userData = {
        uid: uid,
        nombre: this.nombre,
        rut: this.rut,
        celular: this.celular,
        email: this.mailuser,
        password: this.password, // **Hay que encriptar porque se ven contraseñas XD lol jaja osea wow omg **
      };

      // Agrega el usuario a Firestore (este método ya está en tu servicio)
      await this.firebaseService.addUserToFirestore(uid, userData);

      console.log('Usuario registrado exitosamente:', userCredential);

      // Redirigir al usuario a la página de login después del registro
      this.navCtrl.navigateForward('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar el usuario, por favor intenta nuevamente.');
    }
  }

  // Método para alternar la visibilidad de la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
