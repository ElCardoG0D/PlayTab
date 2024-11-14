import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiacomunaPage } from './cambiacomuna.page';

const routes: Routes = [
  {
    path: '',
    component: CambiacomunaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiacomunaPageRoutingModule {}
