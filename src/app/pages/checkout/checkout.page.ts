import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cart = [];
  cartItems = [];
  private newproductList = [];

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getProducts();
    this.cart = this.cartService.getCart();

    this.newproductList = this.cart;

  }

}
