import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';


//import { TooltipsModule } from 'ionic-tooltips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BsModalModule } from 'ng2-bs3-modal';

import { GlobalService } from './shared/global';
import { ModalCartPageModule } from './modal/modal-cart/modal-cart.module';
import { ValidationMesaage } from './validation/ValidationMessage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, BrowserAnimationsModule, IonicModule.forRoot(), BsModalModule, AppRoutingModule, HttpClientModule,ModalCartPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, GlobalService, ValidationMesaage],
  bootstrap: [AppComponent],
})
export class AppModule { }
