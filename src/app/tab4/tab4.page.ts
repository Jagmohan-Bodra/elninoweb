import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/LoaderService';
import { DataService } from 'src/app/services/common.service';
import { CartService } from '../services/cart.service';
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
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dataservice: DataService,
    private cartService: CartService,
    private loadservice: LoaderService
  ) { }

  ngOnInit() {
    this.loadservice.showLoader();
    this.cartItems = this.cartService.getProducts();
    this.Totalcart = this.cartService.getCart();

    this.ProductsInCartList = this.Totalcart;

  }


  addToCart(item) {
    var newItem = {
      "id": item.id,
      "name": item.name,
      "price": parseFloat(item.price),
      "imgPath": item.imgPath,
      "quantityInCart": 1
    }
    this.cartService.addProduct(newItem);
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
    // if (item.quantityInCart > 0) {
    //   item.quantityInCart -= 1;
    //   const index: number = this.itemsInCart.indexOf(item);
    //   if (index !== -1) {
    //     this.itemsInCart.splice(index, 1);
    //   }
    // }

  }

}
