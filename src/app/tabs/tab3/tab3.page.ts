import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service'; // Ajusta la ruta si es necesario
import { LocalStorageService } from 'src/app/services/local-storage.service'; // Ajusta la ruta si es necesario

interface User {
  Id_User: number;
  Run_User: string;
  Nom_User: string;
  Correo_User: string;
  Celular_User: string;
  FechaNac_User: string;
  Id_Comuna: number;
  Nombre_Comuna?: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  userData: User | null = null; // Usamos la interfaz User

  constructor(private databaseService: DatabaseService, private localS: LocalStorageService) { }

  ngOnInit() {
    const userId = this.localS.ObtenerId('Id_User');
    console.log('Id del usuario:', userId);

    // Llama a la función para obtener los datos del usuario
    if (userId) {
      this.databaseService.getUserData(userId)
        .then((data: User) => { // Especificar el tipo
          this.userData = data;
          console.log('Datos del usuario:', this.userData);
        })
        .catch((error: any) => { // Especificar el tipo
          console.error('Error al obtener los datos del usuario:', error);
        });
    } else {
      console.log('No se encontró el ID del usuario.');
    }
  }
  logOut() {
    // Implementa la lógica para cerrar sesión
    this.localS.EliminarId('Id_User');
     
  }
}
