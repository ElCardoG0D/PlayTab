import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadanfitrionPageRoutingModule } from './actividadanfitrion-routing.module';

import { ActividadanfitrionPage } from './actividadanfitrion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadanfitrionPageRoutingModule
  ],
  declarations: [ActividadanfitrionPage]
})
export class ActividadanfitrionPageModule {}
