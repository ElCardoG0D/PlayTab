import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadDetalleModalPage } from './actividad-detalle-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadDetalleModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadDetalleModalPageRoutingModule {}
