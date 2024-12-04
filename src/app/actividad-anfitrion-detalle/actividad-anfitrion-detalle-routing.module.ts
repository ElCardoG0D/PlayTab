import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadAnfitrionDetallePage } from './actividad-anfitrion-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadAnfitrionDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadAnfitrionDetallePageRoutingModule {}
