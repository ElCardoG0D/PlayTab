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
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  usuarioSeleccionado: any = { 
    Id_User: null,
    Tipo_User: null,
    Nom_User: '',
    Correo_User: '',
    Celular_User: '',
    Id_Comuna: null
  };
  comunas: any[] = []; 
  isUpdateModalOpen: boolean = false; // Estado del modal de actualización
  tipoUsuarioOptions = [
    { value: 101, label: 'Jugador' },
    { value: 102, label: 'Administrador' },
    { value: 103, label: 'Deshabilitado' }
  ];
  
  
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
  // Confirmar eliminación de usuario
  async confirmarEliminar(usuario: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Está seguro de eliminar la cuenta de ${usuario.Nom_User}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => this.eliminarUsuario(usuario.Id_User),
        },
      ],
    });
    await alert.present();
  }
  // Eliminar un usuario
  eliminarUsuario(Id_User: number) {
    this.dataBase.deleteUsuario(Id_User).subscribe({
      next: () => {
        this.cargarUsuarios();
        console.log('Usuario eliminado');
      },
      error: async (err) => {
        console.error('Error al eliminar usuario:', err);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo eliminar el usuario. Intente nuevamente.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }
  // Abrir modal de actualización
  abrirActualizarModal(usuario: any) {
    if (!usuario) {
      console.error('Error: usuario no válido para actualizar.');
      return;
    }
  
    this.cargarComunas();
  
    // Clonar los datos del usuario seleccionado
    this.usuarioSeleccionado = { 
      Id_User: usuario.Id_User || null,
      Tipo_User: usuario.Tipo_User || 101, // Valor por defecto si no existe (101 = Jugador)
      Nom_User: usuario.Nom_User || '',
      Correo_User: usuario.Correo_User || '',
      Celular_User: usuario.Celular_User || '',
      Id_Comuna: usuario.Id_Comuna || null
    };
  
    console.log('Usuario seleccionado para actualización:', this.usuarioSeleccionado);
    this.isUpdateModalOpen = true;
  }
  
  
  
  // Cerrar el modal
  cerrarModal() {
    this.isUpdateModalOpen = false;
  }
  
  
   // Actualizar los datos del usuario
   actualizarDatos() {
    const { Id_User, Tipo_User, Nom_User, Correo_User, Celular_User, Id_Comuna } =
      this.usuarioSeleccionado;

    this.dataBase
      .updateUsuario(Id_User, Tipo_User, Nom_User, Correo_User, Celular_User, Id_Comuna)
      .subscribe({
        next: () => {
          this.cargarUsuarios();
          this.cerrarModal();
          console.log('Usuario actualizado');
        },
        error: async (err) => {
          console.error('Error al actualizar los datos:', err);
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No se pudieron actualizar los datos. Intente nuevamente.',
            buttons: ['OK'],
          });
          await alert.present();
        },
      });
  }

    // Método para cargar todas las comunas
    cargarComunas(): Promise<void> {
      return new Promise((resolve, reject) => {
        this.dataBase.getTodasLasComunas().subscribe({
          next: (data) => {
            this.comunas = data; // Asignar comunas al array
            console.log('Comunas cargadas:', this.comunas);
            resolve();
          },
          error: async (err) => {
            console.error('Error al cargar comunas:', err);
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'No se pudieron cargar las comunas. Intente más tarde.',
              buttons: ['OK'],
            });
            await alert.present();
            reject(err);
          },
        });
      });
    }
    
  
  
  // Método para cerrar sesión
  logOut() {
    this.localS.ElimnarUsuario('user');
    this.localS.LimpiarUsuario();
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['./login']);
  }

  handleRefresh(event: any) {
    this.cargarUsuarios();
    event.target.complete(); // Detiene el refresco
  }


}

