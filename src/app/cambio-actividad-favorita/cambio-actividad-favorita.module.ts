import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioActividadFavoritaPageRoutingModule } from './cambio-actividad-favorita-routing.module';

import { CambioActividadFavoritaPage } from './cambio-actividad-favorita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioActividadFavoritaPageRoutingModule
  ],
  declarations: [CambioActividadFavoritaPage]
})
export class CambioActividadFavoritaPageModule {}
