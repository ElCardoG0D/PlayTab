import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadDetalleModalPageRoutingModule } from './actividad-detalle-modal-routing.module';

import { ActividadDetalleModalPage } from './actividad-detalle-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadDetalleModalPageRoutingModule
  ],
  declarations: [ActividadDetalleModalPage]
})
export class ActividadDetalleModalPageModule {}
