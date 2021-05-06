import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from '../services/common.service';
import { LoaderService } from '../shared/LoaderService';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/Authentication.service';

import { CartService } from '../services/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from '../services/translate-config.service';
import { IonicToastService } from '../services/ionic-toast.service';
import { AppComponent } from '../app.component';
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
  checked = false;
  lang: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private dataService: DataService, private ionLoader: LoaderService,
    private router: Router,
    private translate: TranslateService,
    public appComponent: AppComponent,
    public MyTranslate: TranslateConfigService,
    private authenticationService: AuthenticationService,
    public IonicToast: IonicToastService,
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

  ionViewWillEnter() {
    var lang = this.MyTranslate.getCurrentLanguage();
    this.lang = lang;
    if (lang == "en") {
      this.checked = false;
      this.MyTranslate.setLanguage(this.checked);
      this.appComponent.useLanguage(this.lang);
    }
    else {
      this.checked = true;
      this.MyTranslate.setLanguage(this.checked);
      this.appComponent.useLanguage(this.lang);
    }
  }

  Clicked() {
    //this.checked = !this.checked;
    this.MyTranslate.setLanguage(this.checked);
    var lang = this.MyTranslate.getCurrentLanguage();
    this.lang = lang;
    this.appComponent.useLanguage(this.lang);
  }
  // addItemToCart(product) {
  //   this.cartService.addProduct(product);
  // }

  openCart() {
    this.router.navigate(['tabs/tab4']);
  }

  doInfinite(event) {
    if (this.loadCounter >= this.maxLoadItem) {
      if (event != "") {
        event.target.complete();
        // disable the infinite scroll after loading all data
        event.target.disabled = true;
        return;
      }

    }
    else {
      this.loadNextProducts(true, event);
    }

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
        this.maxLoadItem = obj.count;

        this.loadCounter = obj.results.length;
        this.loadData(false, "");
        //this.authenticationService.isAuthenticated();
        this.ionLoader.hideLoader();
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
        this.loadCounter = this.loadCounter + obj.results.length;
        this.loadData(isMoreLoad, event);
      },
        error => {
          console.log('oops', error);
          this.ionLoader.hideLoader();
        })
    }, 500);
  }

  loadData(isMoreLoad, event) {
    var pushitemcount = 0;
    setTimeout(() => {
      for (let i = 0; i < this.productItem; i++) {

        var productId = this.products[i].id;

        this.dataService.getProductDetails(productId).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {

          var myJSON = JSON.stringify(data);
          var obj = JSON.parse(myJSON);
          var imageId = obj.id;

          var imageURL = obj.images[0] == undefined ? "" : obj.images[0].original;
          this.dataService.getProductPrice(imageId).pipe(takeUntil(this.destroy$)).subscribe((data2: any[]) => {
            //console.log(data2);
            var newJSON = JSON.stringify(data2);
            var newobj = JSON.parse(newJSON);
            var productPrice = newobj.incl_tax;

            var product = {
              "id": this.products[i].id,
              "name": this.products[i].title,
              "price": productPrice,
              "totalPrice": productPrice,
              "description": "",
              "imgPath": imageURL,
              "quantityInCart": 1
            };
            this.AllProductsList.push(product);
            pushitemcount = pushitemcount + 1;

            if (!isMoreLoad) {
              if ((pushitemcount == this.productItem) || (this.AllProductsList.length >= this.maxLoadItem))
                this.ionLoader.hideLoader();
            }
            else {
              if ((pushitemcount == this.productItem)) {
                event.target.complete();
              }

            }

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

    }, 500);

  }

  showAllCatogories() {
    this.router.navigate(['all-categories']);
  }
  showAllCoupons() {
    this.router.navigate(['coupons']);
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
      "totalPrice": parseFloat(item.totalPrice),
      "imgPath": item.imgPath,
      "quantityInCart": 1
    }
    this.cartService.addProduct(newItem);
    this.IonicToast.showToast("Added to Cart Successfully!");
  }
  GoToAllCategories() {
    this.router.navigate(['/all-categories']);
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
