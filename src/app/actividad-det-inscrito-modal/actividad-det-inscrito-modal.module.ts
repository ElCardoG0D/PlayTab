import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadDetInscritoModalPageRoutingModule } from './actividad-det-inscrito-modal-routing.module';

import { ActividadDetInscritoModalPage } from './actividad-det-inscrito-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadDetInscritoModalPageRoutingModule
  ],
  declarations: [ActividadDetInscritoModalPage]
})
export class ActividadDetInscritoModalPageModule {}
