import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from '../services/common.service';
import { LoaderService } from '../shared/LoaderService';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit, OnDestroy {
  items: any[] = [];
  datalist: any[] = [];
  products = [];
  newproductList = [];
  Allcategories = []
  index: number = 0;
  itemsInCart: Object[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private dataService: DataService, private ionLoader: LoaderService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ionLoader.showLoader();

    setTimeout(() => {

      this.dataService.GetProductList().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        var myJSON = JSON.stringify(data);
        var obj = JSON.parse(myJSON);
        var producURL = obj.results;

        this.products = obj.results;
        this.loadData(false, "");
      },
        error => {
          console.log('oops', error);
          this.ionLoader.hideLoader();
        })


      //---------------------------------------------------

      // this.products = this.dataService.myItemList();
      // this.ionLoader.hideLoader();
      // this.loadData(false, "");

    }, 100);

    this.loadCategories();
  }

  doInfinite(event) {
    this.loadData(true, event);
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

  loadData(isMoreLoad, event) {

    if (isMoreLoad) {
      event.target.complete();
    }
    else {
      setTimeout(() => {
        for (let i = this.index; i < this.products.length; i++) {
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
              //this.items[i].url = imageURL;
              //this.products = data;
              //this.loadData(false, "");   

              var product = {
                "id": this.products[i].id,
                "name": this.products[i].title,
                "price": productPrice,
                "description": "mac detail not available",
                "imgPath": imageURL,
                "quantityInCart": 0
              };
              this.newproductList.push(product);

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


          // this.newproductList.forEach(element => {
          //   this.dataService.getProductPrice(element).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
          //     //console.log(data);
          //     var myJSON = JSON.stringify(data);
          //     var obj = JSON.parse(myJSON);
          //     productPrice = obj.incl_tax;
          //     //this.items[i].url = imageURL;
          //     //this.products = data;
          //     //this.loadData(false, "");   

          //   },
          //     error => {
          //       console.log('oops', error);
          //       this.ionLoader.hideLoader();
          //     });
          //   console.log('newloop');
          // });


          //var productPrice = this.callProductPrice(productId);

        }
        this.index = this.products.length;

        // disable the infinite scroll after loading all data
        if (this.items.length >= this.products.length) {
          event.target.disabled = true;
        }
      }, 1000);
    }
  }

  // callProductImage(productId) {
  //   this.dataService.getProductDetails(productId).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
  //     //console.log(data);
  //     var myJSON = JSON.stringify(data);
  //     var obj = JSON.parse(myJSON);
  //     return obj.images[0].original;
  //     //this.items[i].url = imageURL;
  //     //this.products = data;
  //     //this.loadData(false, "");      
  //   },
  //     error => {
  //       console.log('oops', error);
  //       this.ionLoader.hideLoader();
  //     })
  // }

  // callProductPrice(productId) {
  //   this.dataService.getProductPrice(productId).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
  //     //console.log(data);
  //     var myJSON = JSON.stringify(data);
  //     var obj = JSON.parse(myJSON);
  //     return obj.incl_tax;
  //     //this.items[i].url = imageURL;
  //     //this.products = data;
  //     //this.loadData(false, "");      
  //   },
  //     error => {
  //       console.log('oops', error);
  //       this.ionLoader.hideLoader();
  //     })

  // }

  addToCart(item) {

    item.quantityInCart += 1;
    this.itemsInCart.push(item);

  }
  removeToCart(item) {

    if (item.quantityInCart > 0) {
      item.quantityInCart -= 1;
      const index: number = this.itemsInCart.indexOf(item);
      if (index !== -1) {
        this.itemsInCart.splice(index, 1);
      }
    }

  }
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
