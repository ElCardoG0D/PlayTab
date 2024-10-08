import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoverPwPage } from './recover-pw.page';

const routes: Routes = [
  {
    path: '',
    component: RecoverPwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverPwPageRoutingModule {}
