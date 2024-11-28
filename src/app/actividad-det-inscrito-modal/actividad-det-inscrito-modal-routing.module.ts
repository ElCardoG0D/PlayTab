import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadDetInscritoModalPage } from './actividad-det-inscrito-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadDetInscritoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadDetInscritoModalPageRoutingModule {}
