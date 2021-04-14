import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DataService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/shared/LoaderService';

import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {
  product = {};
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  productId: number;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private animatioCntrl: AnimationController,
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

  populateProduct() {

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
}
