import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  cart = [];
  cartItems = [];
  constructor(
    private cartService: CartService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.cartItems = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
  }
  openCart() {
    this.router.navigate(['tabs/tab4']);
  }
}
