import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      token: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  onSubmit() {
    if (this.resetForm.valid) {
      const { token, newPassword, confirmPassword } = this.resetForm.value;
      if (newPassword !== confirmPassword) {
        this.presentAlert('Error', 'Las contraseñas no coinciden.');
        return;
      }

      this.http.post('https://backendplaytab-production.up.railway.app/reset-password', { token, newPassword })
        .subscribe({
          next: () => {
            this.presentAlert('¡Muy Bien!', 'Contraseña restablecida exitosamente.');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.presentAlert('Error', 'Token inválido para actualizar la contraseña.');
            console.error(error);
          }
        });
    }
  }
}
