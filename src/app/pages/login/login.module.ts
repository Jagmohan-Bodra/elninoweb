import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule { }
