import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DataService } from '../../services/common.service';
import { LoaderService } from '../../shared/LoaderService';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { IonicToastService } from '../../services/ionic-toast.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
  cart = [];
  cartItems = [];
  cartProduct = {};
  public product: any;
  items: any[] = [];
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  productId: number;
  products = [];
  newproductList = [];
  index: number = 0;
  images: any;
  loadCounter: number = 0;
  maxLoadItem: number;
  productItem: number = 10;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private animatioCntrl: AnimationController,
    private cartService: CartService,
    public IonicToast: IonicToastService,
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
          this.images = obj.images;
          var tempproduct = {
            "id": obj.id,
            "name": obj.title,
            "price": productPrice, // obj.attributes[1].value call getProductPrice
            "description": obj.description,
            "images": obj.images,
            "quantityInCart": 1
          };

          this.product = tempproduct;

          this.cartProduct = {
            "id": obj.id,
            "name": obj.title,
            "price": productPrice, // obj.attributes[1].value call getProductPrice
            "totalPrice": productPrice,
            "description": obj.description,
            "imgPath": obj.images[0].original,
            "quantityInCart": 1
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

      this.ionLoader.hideLoader();
    }, 100);
  }

  openStoreInfo() {
    this.router.navigate(['seller-info']);
  }
  openCart() {
    this.router.navigate(['tabs/tab4']);
  }
  addItemToCartBuy(buyitem) {
    var BuynewItem = {
      "id": buyitem.id,
      "name": buyitem.name,
      "price": parseFloat(buyitem.price),
      "totalPrice": parseFloat(buyitem.totalPrice),
      "imgPath": buyitem.imgPath,
      "quantityInCart": 1
    }
    this.cartService.addProduct(BuynewItem);
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
              "totalPrice": productPrice,
              "description": "",
              "imgPath": imageURL,
              "quantityInCart": 1
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

  addItemToCart(item) {
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

  GoToDescriptionPage(id: number) {
    this.router.navigate(['description'],
      {
        state: {
          Id: id
        }
      }
    );
  }
}
