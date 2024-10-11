import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mailuser: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isAlertOpen: boolean = false;
  alertMessage: string = '';
  showPassword = false; 

  constructor(
    private router: Router, 
    private navCTRL: NavController
  ) { }

  ngOnInit() {
    // Cargar el correo del localStorage si 'rememberMe' está habilitado
    this.mailuser = localStorage.getItem('mailuser') || '';
    if (localStorage.getItem('rememberMe') === 'true') {
      this.rememberMe = true;
      this.password = localStorage.getItem('password') || '';
    }
  }

  // Método para mostrar la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    // Validaciones
    if (!this.mailuser || !this.password) {
      this.setAlertOpen(true, "Ingrese su correo y contraseña.");
      return;
    }

    // Aquí debes realizar la lógica de inicio de sesión con tu backend
    // Por ejemplo, realizar una solicitud HTTP para validar las credenciales.

    // Simulando la validación de usuario (reemplaza esto con tu lógica real)
    if (this.mailuser === 'usuario@ejemplo.com' && this.password === 'contraseña123') {
      // Guardar el correo y la contraseña en localStorage si 'rememberMe' está habilitado
      if (this.rememberMe) {
        localStorage.setItem('mailuser', this.mailuser);
        localStorage.setItem('password', this.password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('mailuser');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }

      // Navegar a la página principal
      this.router.navigate(['./tabs/tab1'], { queryParams: { mailuser: this.mailuser }});
    } else {
      this.setAlertOpen(true, "Correo o contraseña incorrectos.");
    }
  }

  signup() {
    this.router.navigate(['./register']);
  }

  recover() {
    this.router.navigate(['./recover-pw']);
  }

  // Método que permite abrir o cerrar una alerta.
  setAlertOpen(isOpen: boolean, message?: string) {
    this.isAlertOpen = isOpen;         
    this.alertMessage = message || '';
  }
}
