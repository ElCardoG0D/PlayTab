import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiacomunaPageRoutingModule } from './cambiacomuna-routing.module';

import { CambiacomunaPage } from './cambiacomuna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiacomunaPageRoutingModule
  ],
  declarations: [CambiacomunaPage]
})
export class CambiacomunaPageModule {}
