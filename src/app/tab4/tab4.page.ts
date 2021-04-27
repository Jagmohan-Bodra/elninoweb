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



}
