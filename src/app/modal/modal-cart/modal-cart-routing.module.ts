import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCartPage } from './modal-cart.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCartPageRoutingModule {}
