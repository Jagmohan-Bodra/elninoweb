import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/common.service';
import { LoaderService } from '../shared/LoaderService';

import { ModalCartPage } from '../modal/modal-cart/modal-cart.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit, OnDestroy {
  modelData: any;
  items: any[] = [];
  datalist: any[] = [];
  products = [];
  newproductList = [];
  index: number = 0;
  loadCounter: number = 0;
  maxLoadItem: number = 6;
  itemsInCart: Object[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private dataService:DataService, private ionLoader: LoaderService, public modalController: ModalController) {}

  ngOnInit() {
    this.ionLoader.showLoader();

    setTimeout(() => {

      this.dataService.GetProductList().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        console.log(data);
        var producURL = data;

        this.products = data;

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


  }

  doInfinite(event) {
    this.loadData(true, event);
  }

  loadData(isMoreLoad, event) {
    this.loadCounter=0;
      setTimeout(() => {
        
        if(this.index>=this.products.length)
        {
          if(event!="")
          {
            event.target.complete();
             // disable the infinite scroll after loading all data
            event.target.disabled = true;
            return;
          }

        }
        for (let i = this.index; i < this.index+this.maxLoadItem; i++) {
          if(this.products[i]==undefined) continue;
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
                "name": this.products[i].title,
                "price": productPrice,
                "description": "mac detail not available",
                "imgPath": imageURL,
                "quantityInCart": 0
              };
              this.newproductList.push(product);
              this.loadCounter+=1;
                          
              if (!isMoreLoad) {
                if((this.loadCounter==this.maxLoadItem)||(this.newproductList.length >= this.products.length)) 
                this.ionLoader.hideLoader();
              } 
              else
              {                     
                if((this.loadCounter==this.maxLoadItem)||(this.newproductList.length >= this.products.length))
                {
                  event.target.complete();
                }                   
                // disable the infinite scroll after loading all data
                if (this.newproductList.length >= this.products.length) {
                  event.target.disabled = true;
                }

              }          
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
       
        this.index = this.index+this.maxLoadItem;      
    
      }, 1000);
    
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

async openIonModal() {
  const modal = await this.modalController.create({
    component: ModalCartPage,
    componentProps: {
      'model_title': "Add Item to precess"
    }
  });

  modal.onDidDismiss().then((modelData) => {
    if (modelData !== null) {
      this.modelData = modelData.data;
      console.log('Modal Data : ' + modelData.data);
    }
  });

  return await modal.present();
}
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }


}
