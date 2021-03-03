import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse} from "@angular/common/http";
import { GlobalService } from '../shared/global';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService{

  items: any[] = [];
  rotateImg = 0;
  productList = [
    {
    "name":'macBook',
    "price":"$5000",
    "description":"mac detail not available",
    "imgPath":"./assets/img/product/MacBook_Pro_15_inch.jpg",
    "quantityInCart":0
    },
    {
      "name":'ChargerType C',
      "price":"$40",
      "description":"mac detail not available",
      "imgPath":"./assets/img/product/charger type.jpg",
      "quantityInCart":0
    },
    {
      "name":'foldable keyboard',
      "price":"$500",
      "description":"mac detail not available",
      "imgPath":"./assets/img/product/Universal_foldable_keyboard.jpg",
      "quantityInCart":0
    },
    {
      "name":'macBook',
      "price":"$4000",
      "description":"mac detail not available",
      "imgPath":"./assets/img/product/MacBook_Pro_15_inch.jpg",
      "quantityInCart":0
    },
    {
      "name":'Galaxy Tablet',
      "price":"$4000",
      "description":"mac detail not available",
      "imgPath":"./assets/img/product/GalaxyBookTablet.jpg",
      "quantityInCart":0
    },
    {
      "name":'foldable keyboard',
      "price":"$500",
      "description":"mac detail not available",
      "imgPath":"./assets/img/product/Universal foldable keyboard.jpg",
      "quantityInCart":0
    },
    {
      "name":'macBook Pro',
      "price":"$4000",
      "description":"mac detail not available",
      "imgPath":"./assets/img/product/MacBook_Pro_15_inch.jpg",
      "quantityInCart":0
    },
    {
      "name":'Galaxy Tablet',
      "price":"$4000",
      "description":"mac detail not available",
      "imgPath":"./assets/img/product/GalaxyBookTablet.jpg",
      "quantityInCart":0
    },
    {
      "name":'foldable keyboard',
      "price":"$500",
      "description":"mac detail not available",
      "imgPath":"./assets/img/product/Universal_foldable_keyboard.jpg",
      "quantityInCart":0
    },
    {
      "name":'mac book pro',
      "price":"$550",
      "description":"mac detail not available",
      "imgPath":"./assets/img/product/MacBook_Pro_15_inch.jpg",
      "quantityInCart":0
    },
    {
      "name":'ChargerType C',
      "price":"$40",
      "description":"mac detail not available",
      "imgPath":"./assets/img/product/charger type.jpg",
      "quantityInCart":0
    },
    {
      "name":'foldable keyboard',
      "price":"$500",
      "description":"mac detail not available",
      "imgPath":"./assets/img/product/Universal foldable keyboard.jpg",
      "quantityInCart":0
    },
    {
      "name":'Galaxy Tablet',
      "price":"$4000",
      "description":"mac detail not available",
      "imgPath":"./assets/img/product/GalaxyBookTablet.jpg",
      "quantityInCart":0
    },
    {
      "name":'foldable keyboard',
      "price":"$300",
      "description":"mac detail not available",
      "imgPath":"./assets/img/product/Universal_foldable_keyboard.jpg",
      "quantityInCart":0
    },
    
  ];
    constructor(private httpClient: HttpClient, private globalService: GlobalService ) {
      for (let i = 0; i < 50; i++) {
        this.items.push(this.productList[this.rotateImg]
        );
  
        this.rotateImg++;
        if (this.rotateImg === this.productList.length) {
          this.rotateImg = 0;
        }
      }
     }

     // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    })
  }
  
     GetProductList(){
  
      return  this.httpClient.get(this.globalService.resourceBaseUrl + "products/").pipe(catchError(this.handleError));
    }
    
     //get item list
     myItemList()
     {
      return this.items;
     }


    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
          // Client-side errors
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side errors
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
      }
     
     

}
