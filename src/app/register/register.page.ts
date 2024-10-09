import { Component } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { NavController } from '@ionic/angular';

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
    private navCtrl: NavController
  ) {}

  // Método para el registro de usuario
  async SingUp() {
    // Validación de contraseñas
    if (this.password !== this.ConfirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Validación de términos y condiciones
    if (!this.AceptaCondiciones) {
      alert("Debes aceptar los términos y condiciones");
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
