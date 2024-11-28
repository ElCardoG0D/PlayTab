import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DatabaseService } from 'src/app/database.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  actividades: any[] = [];

  constructor(private router:Router, private localS : LocalStorageService, private dbService: DatabaseService, private alertController: AlertController) { }

  ionViewWillEnter() {
    this.cargarHistorial();
  }

  ngOnInit() {
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  cargarHistorial() {
    const user = this.localS.ObtenerUsuario('user');
    const idUser = user?.Id_User;
    console.log('User data:', user);

    this.dbService.getHistorial(idUser).subscribe(
      (data) => {
        this.actividades = data;
        this.actividades.forEach(actividad => {
          actividad.Url = actividad.Url || '/assets/portrait/nocover.jpg';
        }); 
        
      },
      (error) => {
        this.presentAlert('Error', 'No se pudieron cargar el historial.');
      }
    );
  }

  Volver(){
    this.router.navigate(['./tabs/tab4']);
  }

}
