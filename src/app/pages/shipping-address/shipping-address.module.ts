import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShippingAddressPageRoutingModule } from './shipping-address-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ShippingAddressPage } from './shipping-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShippingAddressPageRoutingModule,
    TranslateModule
  ],
  declarations: [ShippingAddressPage]
})
export class ShippingAddressPageModule { }
