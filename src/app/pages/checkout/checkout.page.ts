import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from '../../shared/LoaderService';
import { DataService } from '../../services/common.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
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
  cart = [];
  Coupon: string;
  newproductList = [];
  result: Observable<any>;

  url = 'http://saib.gate2play.com/hussam/ionicserverside.php';
  checkoutId: String;
  options = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  constructor(
    private cartService: CartService,
    private ionLoader: LoaderService,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getProducts();
    this.cart = this.cartService.getCart();

    this.newproductList = this.cart;
  }

  ionViewWillEnter() {
    this.cartItems = this.cartService.getProducts();
    this.calculateCartItem();

  }

  calculateCartItem() {
    this.Totalcart = this.cartService.getCart();
    this.ProductsInCartList = this.Totalcart;
    // Calculate Total
    if (this.ProductsInCartList.length > 0) {
      this.totalAmount = this.ProductsInCartList.map(item => item.totalPrice).reduce((prev, next) => prev + next);
      this.amountWithShipping = parseFloat(this.totalAmount.toString()) + parseFloat(this.shippingAmount.toString());
    }
  }

  ionViewDidEnter() {
    this.ionLoader.showLoader();
    this.calculateCartItem();
    console.log('hi');
    let data = {
      method: 'payment',
      amount: this.amountWithShipping
    };

    this.http.post(this.url, data, this.options).subscribe(
      (data) => {
        console.log(data);
        this.checkoutId = data['checkoutId'];
        console.log(this.checkoutId);

        let script = document.createElement('script');
        script.src = 'https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=' + this.checkoutId;
        document.body.appendChild(script);
        this.ionLoader.hideLoader();
      },
      (error) => {
        console.log(error);
        this.ionLoader.hideLoader();
      }
    );
    //this.result = this.movieServic.requestCheckoutId(data);
  }
}
