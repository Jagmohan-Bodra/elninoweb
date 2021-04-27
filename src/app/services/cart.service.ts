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
    var tempCartObject = [];
    tempCartObject = this.Globalcart
      .filter((cart) => cart.id === cartProduct.id);
    var cartItems = tempCartObject;

    if (cartItems.length > 0) {
      //cartItems[0].price = cartItems[0].price;
      cartItems[0].quantityInCart = cartItems[0].quantityInCart + cartProduct.quantityInCart;
    }
    else {
      this.Globalcart.push(cartProduct);
    }
  }

  removeProduct(cartProduct) {
    var getCartObject = [];
    getCartObject = this.Globalcart
      .filter((cart) => cart.id === cartProduct.id);

    var cartItem = getCartObject;

    if (cartItem.length > 0) {
      if (cartItem[0].quantityInCart > 1) {
        //cartItem[0].price = cartItem[0].price - cartProduct.price;
        cartItem[0].quantityInCart = cartItem[0].quantityInCart - cartProduct.quantityInCart;
      }
      else {
        var index = this.Globalcart
          .findIndex((cart) => cart.id === cartProduct.id);
        this.Globalcart.splice(index, 1);
      }

    }
  }
}
