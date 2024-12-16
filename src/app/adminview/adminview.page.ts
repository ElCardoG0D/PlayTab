import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DatabaseService } from 'src/app/database.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.page.html',
  styleUrls: ['./adminview.page.scss'],
})
export class AdminviewPage implements OnInit {
  usuarios: any[] = []; // Array para almacenar los usuarios
  usuariosFiltrados: any[] = []; // Array para almacenar los usuarios filtrados

  constructor(
    private router: Router,
    private localS: LocalStorageService,
    private dataBase: DatabaseService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.cargarUsuarios(); // Llamamos a la función para cargar los usuarios al inicializar la página
  }

  // Método para cargar los usuarios desde el servicio
  cargarUsuarios() {
    this.dataBase.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data; // Asignamos los usuarios al array
        this.usuariosFiltrados = data; // Inicialmente, muestra todos los usuarios
        console.log('Usuarios cargados:', this.usuarios);
      },
      error: async (err) => {
        console.error('Error al cargar usuarios:', err);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudieron cargar los usuarios. Intente más tarde.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  // Método para manejar el evento de búsqueda
  onSearch(event: any) {
    const termino = event.target.value.toLowerCase(); // Captura el término de búsqueda
    if (termino) {
      this.usuariosFiltrados = this.usuarios.filter(usuario =>
        usuario.Nom_User.toLowerCase().includes(termino) ||
        usuario.Correo_User.toLowerCase().includes(termino)
      );
    } else {
      this.usuariosFiltrados = [...this.usuarios]; // Restaura la lista completa si no hay término
    }
  }

  // Método para cerrar sesión
  logOut() {
    this.localS.ElimnarUsuario('user');
    this.localS.LimpiarUsuario();
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['./login']);
  }
}
