import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioActividadFavoritaPage } from './cambio-actividad-favorita.page';

const routes: Routes = [
  {
    path: '',
    component: CambioActividadFavoritaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioActividadFavoritaPageRoutingModule {}
