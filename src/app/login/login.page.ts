import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../firebase.service';

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
    private navCTRL: NavController, 
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    // Cargar el correo del localStorage si 'rememberMe' está habilitado
    if (this.rememberMe) {
      this.mailuser = localStorage.getItem('mailuser') || '';
      this.password = localStorage.getItem('password') || '';
    }
  }

  // Método para mostrar la contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    // Validaciones...
    if (!this.mailuser && !this.password) {
      this.setAlertOpen(true, "Ingrese su correo y contraseña.");
      return;
    }

    // Validaciones adicionales...

    try {
      const userCredential = await this.firebaseService.login(this.mailuser, this.password);
      console.log('Usuario autenticado:', userCredential);
      if (this.rememberMe) {
        localStorage.setItem('mailuser', this.mailuser);
        localStorage.setItem('password', this.password);
      }
      this.router.navigate(['./tabs/tab1'], { queryParams: { mailuser: this.mailuser }});
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.setAlertOpen(true, errorMessage);
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
