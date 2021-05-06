import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponsPageRoutingModule } from './coupons-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CouponsPage } from './coupons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponsPageRoutingModule,
    TranslateModule
  ],
  declarations: [CouponsPage]
})
export class CouponsPageModule { }
