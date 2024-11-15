import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetForm: FormGroup;
  token!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private alertController: AlertController
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || '';  // Obtenemos el token desde la URL
  }

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
      const { newPassword, confirmPassword } = this.resetForm.value;
      if (newPassword !== confirmPassword) {
        this.presentAlert('Error :(', 'Las contraseñas no coinciden.');
        return;
      }

      this.http.post('http://localhost:3000/reset-password', { token: this.token, newPassword })
        .subscribe({
          next: () => {
            this.presentAlert('¡Muy Bien!', 'Contraseña restablecida exitosamente.');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.presentAlert('Error :(', 'No logramos restablecer la contraseña.');
            console.error(error);
          }
        });
    }
  }
}
