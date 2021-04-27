import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DataService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/shared/LoaderService';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
  cart = [];
  cartItems = [];
  cartProduct = {};
  product = {};
  items: any[] = [];
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  productId: number;
  products = [];
  private newproductList = [];
  index: number = 0;
  loadCounter: number = 0;
  maxLoadItem: number;
  productItem: number = 10;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private animatioCntrl: AnimationController,
    private cartService: CartService,
    private dataService: DataService, private ionLoader: LoaderService,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.productId = state.Id;
    }
  }


  ngOnInit() {
    this.activeVariation = 'size';
    this.ionLoader.showLoader();
    this.loadProducts();
    this.cartItems = this.cartService.getProducts();
    this.cart = this.cartService.getCart();

    setTimeout(() => {

      this.dataService.getProductDetails(this.productId).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        console.log(data);
        var myJSON = JSON.stringify(data);
        var obj = JSON.parse(myJSON);

        console.log(obj);
        var imageId = obj.id;
        this.dataService.getProductPrice(imageId).pipe(takeUntil(this.destroy$)).subscribe((data2: any[]) => {
          console.log(data2);
          var newJSON = JSON.stringify(data2);
          var newobj = JSON.parse(newJSON);
          var productPrice = newobj.incl_tax;
          //this.items[i].url = imageURL;
          //this.products = data;
          //this.loadData(false, "");   

          var tempproduct = {
            "id": obj.id,
            "title": obj.title,
            "price": productPrice, // obj.attributes[1].value call getProductPrice
            "description": obj.description,
            "images": obj.images
          };

          this.product = tempproduct;

          this.cartProduct = {
            "id": obj.id,
            "title": obj.title,
            "price": productPrice, // obj.attributes[1].value call getProductPrice
            "description": obj.description,
            "imgPath": obj.images[0].original,
          };

        },
          error => {
            console.log('oops', error);
            this.ionLoader.hideLoader();
          });




        this.populateProduct();
      },
        error => {
          console.log('oops', error);
          this.ionLoader.hideLoader();
        })


    }, 100);
  }



  openCart() {
    this.router.navigate(['tabs/tab4']);
  }

  populateProduct() {

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

      //this.index = this.index + this.maxLoadItem;

    }, 500);

  }


  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;

    if (this.activeVariation == 'color') {
      this.animatioCntrl.create()
        .addElement(document.querySelector('.sizes'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
        .fromTo('opacity', '1', '0.2')
        .play();

      this.animatioCntrl.create()
        .addElement(document.querySelector('.colors'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
        .fromTo('opacity', '0.2', '1')
        .play();
    } else {
      this.animatioCntrl.create()
        .addElement(document.querySelector('.sizes'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(100%)', 'translateX(0)')
        .fromTo('opacity', '0.2', '1')
        .play();

      this.animatioCntrl.create()
        .addElement(document.querySelector('.colors'))
        .duration(500)
        .iterations(1)
        .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
        .fromTo('opacity', '1', '0.2')
        .play();
    }
  }

  changeSize(size: number) {
    this.selectedSize = size;
  }

  changeColor(color: number) {
    this.selectedColor = color;
  }

  addItemToCart(product) {
    this.cartService.addProduct(product);
  }
}
