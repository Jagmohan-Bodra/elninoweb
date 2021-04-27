import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from '../services/common.service';
import { LoaderService } from '../shared/LoaderService';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/Authentication.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit, OnDestroy {
  Totalcart = [];
  cartItems = [];
  items: any[] = [];
  datalist: any[] = [];
  products = [];
  private AllProductsList = [];
  Allcategories = []
  index: number = 0;
  loadCounter: number = 0;
  maxLoadItem: number;
  productItem: number = 10;
  nextURL: string = '';
  prevURL: string = '';
  itemsInCart: Object[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private dataService: DataService, private ionLoader: LoaderService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.ionLoader.showLoader();
    this.loadCategories();
    this.loadProducts();
    this.cartItems = this.cartService.getProducts();
    this.Totalcart = this.cartService.getCart();
    //console.log("total:" + this.cart);
    console.log("Total :" + this.cartItems);
  }

  // addItemToCart(product) {
  //   this.cartService.addProduct(product);
  // }

  openCart() {
    this.router.navigate(['tabs/tab4']);
  }

  doInfinite(event) {
    setTimeout(() => {
      this.loadNextProducts(true, event);
      event.target.complete();
    }, 6000)
  }

  loadProducts() {
    setTimeout(() => {
      this.dataService.GetProductList().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        var myJSON = JSON.stringify(data);
        var obj = JSON.parse(myJSON);
        this.nextURL = obj.next;
        this.prevURL = obj.previous;
        this.products = obj.results;
        this.productItem = obj.results.length;
        this.maxLoadItem = Math.round((obj.count / 10) + 1);

        this.loadData(false, "");
        this.authenticationService.isAuthenticated();
      },
        error => {
          console.log('oops', error);
          this.ionLoader.hideLoader();
        })
    }, 100);
  }

  loadNextProducts(isMoreLoad, event) {
    setTimeout(() => {
      this.dataService.GetNextProductList(this.nextURL).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        var myJSON = JSON.stringify(data);
        var obj = JSON.parse(myJSON);
        this.products = obj.results;
        this.nextURL = obj.next;
        this.productItem = obj.results.length;
        this.items = [];
        this.loadData(false, "");
      },
        error => {
          console.log('oops', error);
          this.ionLoader.hideLoader();
        })
    }, 500);
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
              "quantityInCart": 1
            };
            this.AllProductsList.push(product);

            if (isMoreLoad)
              event.target.complete();

            this.loadCounter += 1;

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

      //this.index = this.index + this.maxLoadItem;

    }, 500);

  }


  loadCategories() {
    this.dataService.GetAllCetogories().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      var myJSON = JSON.stringify(data);
      var obj = JSON.parse(myJSON);
      this.Allcategories = obj.results;
    },
      error => {
        console.log('oops', error);
        this.ionLoader.hideLoader();
      })
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

  // removeToCart(item) {
  //   if (item.quantityInCart > 0) {
  //     item.quantityInCart -= 1;
  //     const index: number = this.itemsInCart.indexOf(item);
  //     if (index !== -1) {
  //       this.itemsInCart.splice(index, 1);
  //     }
  //   }

  // }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
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
