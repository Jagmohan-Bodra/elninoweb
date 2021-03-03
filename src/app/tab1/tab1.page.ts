import { Component,OnInit, OnDestroy,ViewChild  } from '@angular/core';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from '../services/common.service';
import { LoaderService } from '../shared/LoaderService';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit, OnDestroy {
  items: any[] = [];
  datalist: any[] = [];
  products = [];
  index:number=0;
  itemsInCart: Object[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private dataService:DataService, private ionLoader: LoaderService) {}

  ngOnInit() {
    this.ionLoader.showLoader();
 
    setTimeout(() => {  

      // this.dataService.GetProductList().pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
      //   console.log(data);
      //   this.products = data;  
      //   this.loadData(false, "");
      // },
      // error => {
      //   console.log('oops', error);
      //   this.ionLoader.hideLoader(); 
      // }) 
      
      
      //---------------------------------------------------

      this.products=  this.dataService.myItemList();
      this.ionLoader.hideLoader();
      this.loadData(false, "");

     }, 100);
   

  }

  doInfinite(event) {
    this.loadData(true, event);
  }
  
  loadData(isMoreLoad,event) {
    setTimeout(() => {
      for (let i = this.index; i < this.index+2; i++) {
        this.items.push(this.products[i]);
      }
      if(isMoreLoad)
      {
        event.target.complete();
      }  

      this.index=this.index+2;

      // disable the infinite scroll after loading all data
      if (this.items.length >= this.products.length) {
        event.target.disabled = true;
      }
    }, 1000);
  }
  addToCart(item){

    item.quantityInCart += 1;
    this.itemsInCart.push(item);

}
removeToCart(item){

  if(item.quantityInCart>0)
  {
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

  
}
