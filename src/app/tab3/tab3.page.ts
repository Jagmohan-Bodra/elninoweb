import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from '../services/translate-config.service';
import arabicLanguage from "../../assets/i18n/ar.json";
import defaultLanguage from "../../assets/i18n/en.json";
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  cart = [];
  cartItems = [];
  checked = false;
  lang: any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private translate: TranslateService,
    public MyTranslate: TranslateConfigService,
    public appComponent: AppComponent
  ) { }
  ngOnInit() {
    this.cartItems = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
  }

  ionViewWillEnter() {
    var lang = this.MyTranslate.getCurrentLanguage();
    this.lang = lang;
    if (lang == "en") {
      this.checked = false;
      this.MyTranslate.setLanguage(this.checked);
      this.appComponent.useLanguage(this.lang);
    }
    else {
      this.checked = true;
      this.MyTranslate.setLanguage(this.checked);
      this.appComponent.useLanguage(this.lang);
    }
  }

  Clicked() {
    //this.checked = !this.checked;
    this.MyTranslate.setLanguage(this.checked);
    var lang = this.MyTranslate.getCurrentLanguage();
    this.lang = lang;
    this.appComponent.useLanguage(this.lang);
  }

  openCart() {
    this.router.navigate(['tabs/tab4']);
  }
}
