import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../services/common.service';
import { LoaderService } from '../shared/LoaderService';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  cart = [];
  cartItems = [];
  cards: any;
  category: string = 'gear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  items: any[] = [];
  index: number = 0;
  productItem: number = 10;
  private newproductList = [];
  products = [];
  constructor(
    private router: Router,
    public navCtrl: NavController,
    private dataService: DataService,
    private cartService: CartService,
    private ionLoader: LoaderService) {
    this.cards = new Array(10);
    this.loadProducts();
  }

  ngOnInit() {
    this.cartItems = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
  }
  openCart() {
    this.router.navigate(['tabs/tab4']);
  }

  loadProducts() {
    setTimeout(() => {
      this.dataService.GetProductList().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        var myJSON = JSON.stringify(data);
        var obj = JSON.parse(myJSON);

        this.products = obj.results;
        this.loadData(false, "");
      },
        error => {
          console.log('oops', error);
          this.ionLoader.hideLoader();
        })
    }, 100);
  }

  loadData(isMoreLoad, event) {

    setTimeout(() => {

      for (let i = this.index; i < this.index + this.productItem; i++) {
        //if (this.products[i] == undefined) continue;
        this.items.push(this.products[i]);
        var productId = this.items[i].id;

        this.dataService.getProductDetails(productId).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
          console.log(data);
          var tempProdcutId = productId;
          var myJSON = JSON.stringify(data);
          var obj = JSON.parse(myJSON);
          var imageURL = obj.images[0].original;
          var imageId = obj.id;
          this.dataService.getProductPrice(imageId).pipe(takeUntil(this.destroy$)).subscribe((data2: any[]) => {
            console.log(data2);
            var newJSON = JSON.stringify(data2);
            var newobj = JSON.parse(newJSON);
            var productPrice = newobj.incl_tax;

            var product = {
              "id": this.products[i].id,
              "name": this.products[i].title,
              "price": productPrice,
              "description": this.products[i].description,
              "imgPath": imageURL,
              "quantityInCart": 0
            };
            this.newproductList.push(product);

            if (isMoreLoad)
              event.target.complete();


          },
            error => {
              console.log('oops', error);
              this.ionLoader.hideLoader();
            });

        },
          error => {
            console.log('oops', error);
            this.ionLoader.hideLoader();
          });
      }

      //this.index = this.index + this.maxLoadItem;

    }, 100);

  }
}
