import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminviewPageRoutingModule } from './adminview-routing.module';

import { AdminviewPage } from './adminview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminviewPageRoutingModule
  ],
  declarations: [AdminviewPage]
})
export class AdminviewPageModule {}
