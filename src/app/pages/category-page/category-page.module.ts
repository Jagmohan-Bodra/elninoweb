import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPagePageRoutingModule } from './category-page-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryPagePage } from './category-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPagePageRoutingModule,
    TranslateModule
  ],
  declarations: [CategoryPagePage]
})
export class CategoryPagePageModule { }
