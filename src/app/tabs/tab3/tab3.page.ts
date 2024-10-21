import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  nombreUser: string = '';
  telefonoUser: string = '';
  correoUser: string = '';
  regionUser: string = '';
  comunaUser: string = '';

  constructor(private router:Router, private localS : LocalStorageService) { }

  ngOnInit() {
    const usuario = this.localS.ObtenerUsuario('user');
      if (usuario) {
        this.nombreUser = usuario.Nom_User;
        this.correoUser = usuario.Correo_User;
        this.telefonoUser = usuario.Celular_User;
        this.regionUser = usuario.Nombre_Region;
        this.comunaUser = usuario.Nombre_Comuna;
      } else {
        console.warn('No se encontró información del usuario en el LocalStorage.');
      }
  }

  logOut(){
    this.localS.ElimnarUsuario('user');
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['./login']);
  }

}
