import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-cambio-actividad-favorita',
  templateUrl: './cambio-actividad-favorita.page.html',
  styleUrls: ['./cambio-actividad-favorita.page.scss'],
})
export class CambioActividadFavoritaPage implements OnInit {

  categoriaId: any[] = [];
  subcategoriaId: any[] = [];
  categoriaSeleccionada: number = 0;
  subcategoriaSeleccionada: number = 0;
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

    this.dbService.getCategoria().subscribe(
      (data) => {
        this.categoriaId = data;
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
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

  cargarCategorias() {
    this.dbService.getSubCategoria(this.categoriaSeleccionada).subscribe(
      (data) => {
        this.subcategoriaId = data;
        console.log('Datos de Subcategorías recibidos:', data);
      },
      (error) => {
        console.error('Error al obtener Subcategorías:', error);
      }
    );
  }

  guardarFavorito() {
    if (this.subcategoriaSeleccionada && this.IdUser) {
      this.dbService.InsertUpdateFavorito(this.subcategoriaSeleccionada, this.IdUser).subscribe(
        async (response) => {
          const user = this.localS.ObtenerUsuario('user');
  
          // Actualizar los datos de la subcategoría seleccionada
          user.Id_SubCategoria = this.subcategoriaSeleccionada;
          user.Nom_SubCategoria = this.subcategoriaId.find(
            sc => sc.Id_SubCategoria === this.subcategoriaSeleccionada
          )?.Nom_SubCategoria || 'Subcategoría Actualizada';
  
          // Guardar en el LocalStorage
          this.localS.GuardarUsuario('user', user);
  
          // Mostrar mensaje de éxito
          await this.presentAlert('Éxito', 'Tu actividad favorita ha sido actualizada correctamente.');
          this.router.navigate(['/tabs/tab3']); 
        },
        async (error) => {
          console.error('Error al guardar la actividad favorita:', error);
          await this.presentAlert('Error', 'Hubo un problema al guardar tu actividad favorita.');
        }
      );
    } else {
      this.presentAlert('Error', 'Debes seleccionar una subcategoría.');
    }
  }

  Volver(){
    this.router.navigate(['./tabs/tab3']);
  }

}
