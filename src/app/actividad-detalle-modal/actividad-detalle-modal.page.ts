import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-actividad-detalle-modal',
  templateUrl: './actividad-detalle-modal.page.html',
  styleUrls: ['./actividad-detalle-modal.page.scss'],
})
export class ActividadDetalleModalPage implements OnInit {

  @Input() actividad: any; 

  constructor(
    private modalController: ModalController 
  ) { }
  
  ngOnInit() {
    console.log('Actividad recibida:', this.actividad); // Verificar los datos recibidos
  }
  
  // Método para cerrar el modal
  volver() {
    this.modalController.dismiss(); // Cierra el modal
  }
}
