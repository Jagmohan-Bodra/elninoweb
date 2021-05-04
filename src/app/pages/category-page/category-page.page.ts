import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from '../../services/common.service';
import { LoaderService } from '../../shared/LoaderService';

import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.page.html',
  styleUrls: ['./category-page.page.scss'],
})
export class CategoryPagePage implements OnInit {
  cart = [];
  cartItems = [];
  products = [];
  categoryId: number;
  productItem: number = 10;
  items: any[] = [];
  datalist: any[] = [];
  private newproductList = [];
  index: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dataService: DataService, private ionLoader: LoaderService,
    private router: Router,
    private cartService: CartService,
  ) {

    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.categoryId = state.Id;
    }
  }

  ngOnInit() {
    this.ionLoader.showLoader();
    this.cartItems = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    setTimeout(() => {

      this.dataService.GetProductList().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        console.log(data);
        var myJSON = JSON.stringify(data);
        var obj = JSON.parse(myJSON);
        this.products = obj.results;
        this.productItem = obj.results.length;
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
          //console.log(data);
          var tempProdcutId = productId;
          var myJSON = JSON.stringify(data);
          var obj = JSON.parse(myJSON);
          var imageURL = obj.images[0].original;
          var imageId = obj.id;
          this.dataService.getProductPrice(imageId).pipe(takeUntil(this.destroy$)).subscribe((data2: any[]) => {
            //console.log(data2);
            var newJSON = JSON.stringify(data2);
            var newobj = JSON.parse(newJSON);
            var productPrice = newobj.incl_tax;

            var product = {
              "id": this.products[i].id,
              "name": this.products[i].title,
              "price": productPrice,
              "description": "mac detail not available",
              "imgPath": imageURL,
              "quantityInCart": 0
            };
            this.newproductList.push(product);

            if (isMoreLoad)
              event.target.complete();

            //this.loadCounter += 1;

            // if (isMoreLoad) {
            //   if ((this.loadCounter == this.maxLoadItem) || (this.newproductList.length >= this.products.length))
            //     this.ionLoader.hideLoader();
            // }
            // else {
            //   if ((this.loadCounter == this.maxLoadItem) || (this.newproductList.length >= this.products.length)) {
            //     event.target.complete();
            //   }
            //   // disable the infinite scroll after loading all data
            //   if (this.nextURL == null) {
            //     event.target.disabled = true;
            //   }

            // }
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
      this.ionLoader.hideLoader();
      //this.index = this.index + this.maxLoadItem;

    }, 500);

  }

  GoToDescriptionPage(id: number) {
    this.router.navigate(['/description'],
      {
        state: {
          Id: id
        }
      }
    );
  }

}
