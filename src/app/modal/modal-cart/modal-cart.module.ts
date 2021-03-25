import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCartPageRoutingModule } from './modal-cart-routing.module';

import { ModalCartPage } from './modal-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCartPageRoutingModule
  ],
  declarations: [ModalCartPage]
})
export class ModalCartPageModule {}
