import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DatabaseService } from 'src/app/database.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ActividadDetalleModalPage } from '../../actividad-detalle-modal/actividad-detalle-modal.page';
import { Router } from '@angular/router';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  weatherData: any;
  weatherIconUrl: string = '';
  actividades: any[] = []; // Almacenar las actividades
  coloresActividades: string[] = []; // Array para almacenar los colores
  actividadesAleatorias: any[] = []; //Almacenar actividades aleatorias
  colors = [
    'col-card1', 'col-card2', 'col-card3', 'col-card4', 'col-card5'
  ];
  private intervalId: any;

  constructor(
    private localS: LocalStorageService,
    private dbService: DatabaseService,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
    private weatherService: WeatherService
  ) {}

  ionViewWillEnter() {
    const user = this.localS.ObtenerUsuario('user');
    if (!user) {
      return;
    }

    this.cargarActividades();
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
          this.coloresActividades = this.actividadesAleatorias.map(() => this.getRandomColor());
          console.log('Actividades aleatorias:', this.actividadesAleatorias);
          console.log('Colores asignados:', this.coloresActividades);
        },
        (error) => {
          console.error('Error al obtener actividades:', error);
          this.presentAlert('Error', 'No se pudieron cargar las actividades.');
        }
      );
    } else {
      console.error('No se encontró el Id_Comuna del usuario o el usuario no está autenticado.');
      this.presentAlert('Error', 'No se pudo cargar el Id_Comuna del usuario.');
    }
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

  // Método para obtener un color aleatorio
  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  // Actividades aleatorias
  getRandomActivities(actividades: any[], count: number): any[] {
    // Hacer una copia del array para no modificar el original
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

  // Método para obtener la ubicación y el clima
  getLocationAndWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.weatherService.getWeatherByLocation(lat, lon).subscribe(data => {
          this.weatherData = data;
          console.log('Datos del clima:', this.weatherData);

          const weatherIconCode = this.weatherData.weather[0].icon;
          this.weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
          console.log('URL del ícono del clima:', this.weatherIconUrl);
        }, error => {
          console.error('Error al obtener el clima:', error);
          this.presentAlert('Error', 'No se pudo obtener el clima.');
        });
      }, error => {
        console.error('Error al obtener la ubicación:', error);
        this.presentAlert('Error', 'No se pudo obtener la ubicación.');
      });
    } else {
      console.error('Geolocalización no es soportada en este navegador.');
      this.presentAlert('Error', 'Geolocalización no es soportada.');
    }
  }

  handleRefresh(event: any) {
    this.cargarActividades();
    this.getLocationAndWeather();
    event.target.complete(); // Detiene el refresco
  }
}
