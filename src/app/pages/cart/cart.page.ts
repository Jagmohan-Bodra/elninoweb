import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/LoaderService';
import { DataService } from '../../services/common.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: any[] = [];
  datalist: any[] = [];
  cartProducts = [];
  newproductList = [];
  index: number = 0;
  itemsInCart: Object[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataservice: DataService, private loadservice: LoaderService) { }

  ngOnInit() {
    this.loadservice.showLoader();

    setTimeout(() => {

      this.dataservice.GetProductList().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        console.log(data);
        var producURL = data;

        this.cartProducts = data;
        this.loadData(false, "");
      },
        error => {
          console.log('oops', error);
          this.loadservice.hideLoader();
        })

    }, 100);
  }

  loadData(moreData, event) {
    setTimeout(() => {
      for (let i = this.index; i < this.cartProducts.length; i++) {
        this.items.push(this.cartProducts[i]);
        var productId = this.items[i].id;

        this.dataservice.getProductDetails(productId).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
          console.log(data);
          var tempProdcutId = productId;
          var myJSON = JSON.stringify(data);
          var obj = JSON.parse(myJSON);
          var imageURL = obj.images[0].original;
          var imageId = obj.id;
          this.dataservice.getProductPrice(imageId).pipe(takeUntil(this.destroy$)).subscribe((data2: any[]) => {
            console.log(data2);
            var newJSON = JSON.stringify(data2);
            var newobj = JSON.parse(newJSON);
            var productPrice = newobj.incl_tax;
            //this.items[i].url = imageURL;
            //this.products = data;
            //this.loadData(false, "");   

            var product = {
              "name": this.cartProducts[i].title,
              "price": productPrice,
              "description": "mac detail not available",
              "imgPath": imageURL,
              "quantityInCart": 0
            };
            this.newproductList.push(product);

          },
            error => {
              console.log('oops', error);
              this.loadservice.hideLoader();
            });

        },
          error => {
            console.log('oops', error);
            this.loadservice.hideLoader();
          });

      }
      this.index = this.cartProducts.length;

      // disable the infinite scroll after loading all data
      if (this.items.length >= this.cartProducts.length) {
        event.target.disabled = true;
      }
    }, 1000);
  }


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

}
