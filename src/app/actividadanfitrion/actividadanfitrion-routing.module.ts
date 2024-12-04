import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadanfitrionPage } from './actividadanfitrion.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadanfitrionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadanfitrionPageRoutingModule {}
