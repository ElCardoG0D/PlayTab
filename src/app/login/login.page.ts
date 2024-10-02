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

  constructor(private router: Router, private navCTRL: NavController) { }

  ngOnInit() {
  }

  //Método para mostrar la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword; // Alternar entre mostrar/ocultar
  }

  login() {
    // Guardar las credenciales en localStorage 
    localStorage.setItem('mailuser', this.mailuser);
    localStorage.setItem('password', this.password);

    // Validar si faltan tanto el correo como la contraseña
    if (!this.mailuser && !this.password) {
      this.setAlertOpen(true, "Ingrese su correo y contraseña.");
      return;
    }

    // Validar si falta el correo
    if (!this.mailuser) {
      this.setAlertOpen(true, "Ingrese un correo.");
      return;
    }

    // Validar si falta la contraseña
    if (!this.password) {
      this.setAlertOpen(true, "Ingrese su contraseña.");
      return;
    }

    // Validar el formato del correo, i Servirá para no discriminar entre mayúsculas y minúsculas
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|cl)$/i;
    if (!emailRegex.test(this.mailuser)) {
      this.setAlertOpen(true, 'El correo es inválido.');
      return;
    }

    // Validar el tamaño de la contraseña
    if (this.password.length < 4 || this.password.length > 8) {
      this.setAlertOpen(true, 'Contraseña inválida');
      return;
    }

    // Si todo es correcto, redirigir a la página de tabs
    // También haré interpolación con el correo del usuario, desde login-tabs-tabs3
    else
      this.router.navigate(['./tabs/tab1'], { queryParams: { mailuser: this.mailuser }});
      console.log('Mailuser en login:', this.mailuser);
  }

  //*Método que permite ir al "Registro"
  signup() {
    this.router.navigate(['./register']);
  }

  recover(){
    this.router.navigate(['./recover-pw']);
  }

  //Método que permite abrir o cerrar una alerta.
  setAlertOpen(isOpen: boolean, message?: string) {
    this.isAlertOpen = isOpen;         
    this.alertMessage = message || '';
  }

}