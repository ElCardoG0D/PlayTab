import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular'; 
@Component({
  selector: 'app-actividad-detalle-modal',
  templateUrl: './actividad-detalle-modal.page.html',
  styleUrls: ['./actividad-detalle-modal.page.scss'],
})
export class ActividadDetalleModalPage implements OnInit {

  constructor(
    private router: Router,
    private modalController: ModalController 
  ) { }
  
  ngOnInit() {
  }
  
  
  //cerrar modal
  volver() {
    this.modalController.dismiss(); // Cierra el modal
  }
}