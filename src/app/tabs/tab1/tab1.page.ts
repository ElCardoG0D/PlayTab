import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DatabaseService } from 'src/app/database.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ActividadDetalleModalPage } from '../../actividad-detalle-modal/actividad-detalle-modal.page';
import { WeatherService } from '../../weather.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  weatherData: any;
  weatherIconUrl: string = '';
  actividades: any[] = []; // Almacenar las actividades
  actividadesAleatorias: any[] = []; //Almacenar actividades aleatorias
  private intervalId: any;

  actividadesFavoritas: any[] = []; // Almacenar las actividades
  actividadesFavoritasAleatorias: any[] = []; //Almacenar actividades aleatorias

  constructor(
    private localS: LocalStorageService,
    private dbService: DatabaseService,
    private alertController: AlertController,
    private modalController: ModalController,
    private weatherService: WeatherService
  ) {}

  ionViewWillEnter() {
    const user = this.localS.ObtenerUsuario('user');
    if (!user) {
      return;
    }

    this.cargarActividades();
    this.cargarActividadFavorito();
    this.getLocationAndWeather();
    
    this.intervalId = setInterval(() => {
      if (this.localS.ObtenerUsuario('user')) {
        this.cargarActividades();
      } else {
        clearInterval(this.intervalId); 
      }
    }, 100000);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cargarActividades() {
    const user = this.localS.ObtenerUsuario('user');
    if (user && user.Id_Comuna) {
      const idComuna = user.Id_Comuna;
  
      this.dbService.getActividades(idComuna).subscribe(
        (data) => {
          this.actividades = data;
          this.actividadesAleatorias = this.getRandomActivities(this.actividades, 6);
          console.log('Actividades aleatorias:', this.actividadesAleatorias);
        },
        (error) => {
          console.error('Error al obtener actividades:', error);
        }
      );
    } else {
      console.error('No se encontró el Id_Comuna del usuario o el usuario no está autenticado.');
    }
  }

  cargarActividadFavorito() {
    const user = this.localS.ObtenerUsuario('user');
    if (user && user.Id_Comuna) {
      const Id_Comuna = user.Id_Comuna;
      const Id_SubCategoria = user.Id_SubCategoria;

  
      this.dbService.getActividadFavorita(Id_Comuna,Id_SubCategoria).subscribe(
        (data) => {
          this.actividadesFavoritas = data;
          this.actividadesFavoritasAleatorias = this.getRandomActivities(this.actividadesFavoritas, 3);
          console.log('Actividades favoritas aleatorias:', this.actividadesFavoritasAleatorias);
        },
        (error) => {
          console.error('Error al obtener actividades favoritas:', error);
        }
      );
    } else {
      console.error('No se encontró el Id_Comuna o el usuario no tiene favoritos.');
    }
  }

  // Actividades aleatorias
  getRandomActivities(actividades: any[], count: number): any[] {
    const shuffled = [...actividades].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Método para abrir el modal al hacer clic en una tarjeta
  async onCardClick(actividad: any) {
    console.log('Actividad clickeada:', actividad);

    const modal = await this.modalController.create({
      component: ActividadDetalleModalPage,
      componentProps: {
        actividad: actividad
      }
    });

    return await modal.present();
  }  

  // Método para mostrar una alerta
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para obtener la ubicación y el clima
  getLocationAndWeather() {
    Geolocation.getCurrentPosition()
      .then(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        this.weatherService.getWeatherByLocation(lat, lon).subscribe(data => {
          this.weatherData = data;
          console.log('Datos del clima:', this.weatherData);
  
          const weatherIconCode = this.weatherData.weather[0].icon;
          this.weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
          console.log('URL del ícono del clima:', this.weatherIconUrl);
        }, error => {
          console.error('Error al obtener el clima:', error);
          this.presentAlert('Error', 'No se pudo obtener el clima.');
        });
      })
      .catch(error => {
        console.error('Error al obtener la ubicación:', error);
        this.presentAlert('Error', 'No se pudo obtener la ubicación.');
      });
  }

  handleRefresh(event: any) {
    this.cargarActividades();
    this.getLocationAndWeather();
    event.target.complete(); // Detiene el refresco
  }
}
