import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  checked: boolean = false;
  lang: any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private translate: TranslateService,
    public appComponent: AppComponent
  ) { }
  ngOnInit() {
    this.cartItems = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
  }

  Clicked() {
    this.checked = !this.checked;
    if (!this.checked) {
      this.translate.setTranslation('en', defaultLanguage);
      this.translate.setDefaultLang('en');
    }
    else {
      this.translate.setTranslation('ar', arabicLanguage);
      this.translate.setDefaultLang('ar');
    }

    this.appComponent.useLanguage(this.lang);
  }

  openCart() {
    this.router.navigate(['tabs/tab4']);
  }
}
