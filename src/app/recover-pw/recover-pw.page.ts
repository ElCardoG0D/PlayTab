import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recover-pw',
  templateUrl: './recover-pw.page.html',
  styleUrls: ['./recover-pw.page.scss'],
})
export class RecoverPwPage implements OnInit {
  rut: string = '';
  mailuser: string = '';
  showPassword = false;
  AceptaCondiciones: boolean = false;

  constructor(private router: Router, private alertController: AlertController, private http: HttpClient) {}

  ngOnInit() {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  validateInputs(): boolean {
    const rutRegex = /^\d{7,8}-[kK\d]$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|cl)$/i;
    if (!this.rut || !this.mailuser) {
      this.presentAlert('Error', 'Faltan rellenar campos');
      return false;
    }
    if (!rutRegex.test(this.rut)) {
      this.presentAlert('Error', 'Ingrese un rut válido.');
      return false;
    }
    if (!emailRegex.test(this.mailuser)) {
      this.presentAlert('Error', 'El correo es inválido.');
      return false;
    }
    return true;
  }

  RecoverPW() {
    if (!this.validateInputs()) return;
  
    this.http.post('https://backendplaytab-production.up.railway.app/recover-password', {
      RUT: this.rut,
      correo: this.mailuser
    })
    .subscribe({
      next: () => {
        this.presentAlert('Éxito', 'Se ha enviado un token de recuperación a tu correo.');
        this.rut = '';
        this.mailuser = '';
        this.router.navigate(['/reset-password']);
      },
      error: () => {
        this.presentAlert('Error', 'No pudimos enviar el token de recuperación, verifica tus datos antes de volver a intentar.');
      }
    });
  }
  
}