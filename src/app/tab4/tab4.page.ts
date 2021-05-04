import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '../shared/LoaderService';
import { DataService } from '../services/common.service';
import { CartService } from '../services/cart.service';
import { TranslateService } from '@ngx-translate/core';
import arabicLanguage from "../../assets/i18n/ar.json";
import defaultLanguage from "../../assets/i18n/en.json";
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  Totalcart = [];
  cartItems = [];
  items: any[] = [];
  datalist: any[] = [];
  cartProducts = [];
  ProductsInCartList = [];
  index: number = 0;
  itemsInCart: Object[] = [];
  totalAmount: Number = 0;
  shippingAmount: Number = 30;
  amountWithShipping: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  checked: boolean = false;
  lang: any;
  constructor(
    private dataservice: DataService,
    private cartService: CartService,
    private translate: TranslateService,
    public appComponent: AppComponent,
    private loadservice: LoaderService
  ) { }

  ionViewWillEnter() {
    this.cartItems = this.cartService.getProducts();
    this.calculateCartItem();

  }

  ngOnInit() {
    //this.loadservice.showLoader();

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

  calculateCartItem() {
    this.Totalcart = this.cartService.getCart();
    this.ProductsInCartList = this.Totalcart;
    // Calculate Total
    this.totalAmount = this.ProductsInCartList.map(item => item.totalPrice).reduce((prev, next) => prev + next);
    this.amountWithShipping = parseFloat(this.totalAmount.toString()) + parseFloat(this.shippingAmount.toString());
  }


  addToCart(item) {
    var newItem = {
      "id": item.id,
      "name": item.name,
      "price": parseFloat(item.price),
      "totalPrice": parseFloat(item.totalPrice),
      "imgPath": item.imgPath,
      "quantityInCart": 1
    }
    this.cartService.addProduct(newItem);
    this.calculateCartItem();
  }

  removeFromCart(item) {
    var newItem = {
      "id": item.id,
      "name": item.name,
      "price": parseFloat(item.price),
      "imgPath": item.imgPath,
      "quantityInCart": 1
    }
    this.cartService.removeProduct(newItem);
    this.calculateCartItem();
    // if (item.quantityInCart > 0) {
    //   item.quantityInCart -= 1;
    //   const index: number = this.itemsInCart.indexOf(item);
    //   if (index !== -1) {
    //     this.itemsInCart.splice(index, 1);
    //   }
    // }

  }

}
