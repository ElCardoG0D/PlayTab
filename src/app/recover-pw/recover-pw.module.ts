import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverPwPageRoutingModule } from './recover-pw-routing.module';

import { RecoverPwPage } from './recover-pw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverPwPageRoutingModule
  ],
  declarations: [RecoverPwPage]
})
export class RecoverPwPageModule {}
