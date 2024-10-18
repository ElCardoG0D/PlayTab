import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  isModalOpen = false;

  constructor() { }

  ngOnInit() {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  crearActividad() {
    // Simular el envío de datos a la base de datos
    console.log('Actividad guardada exitosamente');
    // Aquí puedes agregar lógica para enviar los datos a la base de datos
  }

}