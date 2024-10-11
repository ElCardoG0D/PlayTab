import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from '../database.service'; // Importa tu servicio

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
    private toastController: ToastController,
    private dbService: DatabaseService // Inyecta el servicio
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onRegister() {
    if (this.AceptaCondiciones && this.password === this.ConfirmPassword) {
      // Verificar si comunaId tiene un valor
      if (!this.comunaId) {
        const toast = await this.toastController.create({
          message: 'Debes seleccionar una comuna válida.',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
        return; // Salir de la función si no hay un valor válido
      }
  
      try {
        // Llamada al servicio para registrar al usuario
        await this.dbService.registerUser(this.rut, this.nombre, this.mailuser, this.password, this.comunaId).toPromise();
  
        const toast = await this.toastController.create({
          message: 'Usuario registrado con éxito.',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
      } catch (error) {
        const toast = await this.toastController.create({
          message: 'Error al registrar el usuario.',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    } else {
      const toast = await this.toastController.create({
        message: 'Error: Revisa los campos o acepta los términos.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}
