import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private data = [];
  private Globalcart = [];

  constructor() { }

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.Globalcart;
  }

  addProduct(cartProduct) {
    var tempObj = [];
    tempObj = this.Globalcart.filter(id => id === cartProduct.id);
    if (tempObj.length > 0) {
      // tempObj.price = tempObj.price + cartProduct.price;
      // tempObj.quantityInCart = tempObj.quantityInCart + cartProduct.quantityInCart;
    }
    else {
      this.Globalcart.push(cartProduct);
    }
  }
}
