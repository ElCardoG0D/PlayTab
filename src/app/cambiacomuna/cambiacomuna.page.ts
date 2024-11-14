import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-cambiacomuna',
  templateUrl: './cambiacomuna.page.html',
  styleUrls: ['./cambiacomuna.page.scss'],
})
export class CambiacomunaPage implements OnInit {

  regionId: any[] = [];   
  comunaId: any[] = []; 
  region: number = 0; 
  comuna: number = 0;
  IdUser: number= 0; 

  constructor(
    private localS: LocalStorageService,
    private router : Router,
    private dbService: DatabaseService,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    const user = this.localS.ObtenerUsuario('user');
    this.IdUser = user.Id_User;

    this.dbService.getRegiones().subscribe((data) => {
      this.regionId = data; 
    });
  }

  ngOnInit() {
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  onRegionChange() {
    console.log('Región seleccionada:', this.region);
  
    this.dbService.getComunasPorRegion(this.region).subscribe((data) => {
      this.comunaId = data;
      console.log('Datos de comunas recibidos:', data);
    },
    (error) => {
      console.error('Error al obtener comunas:', error);
    });
  }

  cambiarComuna() {
    if (this.IdUser && this.comuna) {
      this.dbService.cambiarComuna(this.comuna, this.IdUser).subscribe(
        async (response) => {
          const user = this.localS.ObtenerUsuario('user');
          
          user.Id_Comuna = this.comuna;
          user.Nombre_Comuna = this.comunaId.find(c => c.Id_Comuna === this.comuna)?.Nombre_Comuna || 'Comuna Actualizada';
          
          user.Id_Region = this.region;
          user.Nombre_Region = this.regionId.find(r => r.Id_Region === this.region)?.Nombre_Region || 'Región Actualizada';
  
          this.localS.GuardarUsuario('user', user);
  
          // Mostrar mensaje de éxito
          await this.presentAlert('Éxito', 'Región y comuna actualizadas exitosamente.');
          this.router.navigate(['/tabs/tab3']); 
        },
        async (error) => {
          console.error('Error al actualizar la comuna:', error);
          await this.presentAlert('Error', 'No se pudo actualizar la región y comuna. Intente nuevamente.');
        }
      );
    } else {
      this.presentAlert('Advertencia', 'Seleccione una región y comuna.');
    }
  }
  

}
