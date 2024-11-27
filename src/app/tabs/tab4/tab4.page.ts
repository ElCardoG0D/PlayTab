import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  actividades: any[] = []; 
  Id_User: string = '';
  constructor(private dbService: DatabaseService, private localS: LocalStorageService) { } 

  ngOnInit() {
    this.cargarActividades();
    this.cargarDatosUsuario();
  }

  cargarActividades() {
    const user = this.localS.ObtenerUsuario('user'); 
    if (user && user.Id_User) { 
      const idUser = user.Id_User;

      this.dbService.getActividadesActivas(idUser).subscribe(
        (data) => {
          this.actividades = data;
          console.log('Actividades:', this.actividades);
        },
        (error) => {
          console.error('Error al obtener actividades activas:', error);
        }
      );
    } else {
      console.error('No se encontró el Id_User del usuario o el usuario no está autenticado.');
    }
  }
  eliminarUsuarioDeActividad(Id_Actividad: number) {
    const user = this.localS.ObtenerUsuario('user'); // Obtener el usuario desde localStorage
    if (user && user.Id_User) {
      const idUser = user.Id_User;

      this.dbService.eliminarUsuarioDeActividad(idUser, Id_Actividad).subscribe(
        (response) => {
          console.log('Usuario eliminado de la actividad con éxito:', response);
          this.actividades = this.actividades.filter(actividad => actividad.Id_Actividad !== Id_Actividad);
        },
        (error) => {
          console.error('Error al eliminar al usuario de la actividad:', error);
        }
      );
    } else {
      console.error('No se encontró el Id_User del usuario o el usuario no está autenticado.');
    }
  }

  cargarDatosUsuario() {
    const usuario = this.localS.ObtenerUsuario('user');
    if (usuario) {
      this.Id_User=usuario.idUser
    } else {
      console.warn('No se encontró información del usuario en el LocalStorage.');
    }
  }
}
