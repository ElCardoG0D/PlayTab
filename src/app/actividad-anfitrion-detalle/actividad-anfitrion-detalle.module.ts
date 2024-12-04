import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadAnfitrionDetallePageRoutingModule } from './actividad-anfitrion-detalle-routing.module';

import { ActividadAnfitrionDetallePage } from './actividad-anfitrion-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadAnfitrionDetallePageRoutingModule
  ],
  declarations: [ActividadAnfitrionDetallePage]
})
export class ActividadAnfitrionDetallePageModule {}
