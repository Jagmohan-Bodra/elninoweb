import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/shared/LoaderService';

import { Router } from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.page.html',
  styleUrls: ['./category-page.page.scss'],
})
export class CategoryPagePage implements OnInit {

  categoryId: number;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dataService: DataService, private ionLoader: LoaderService,
    private router: Router
  ) {

    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.categoryId = state.Id;
    }
  }

  ngOnInit() {
    this.ionLoader.showLoader();
    setTimeout(() => {

      this.dataService.GetProductList().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        console.log(data);
        var myJSON = JSON.stringify(data);
        var obj = JSON.parse(myJSON);
        console.log(obj);

      },
        error => {
          console.log('oops', error);
          this.ionLoader.hideLoader();
        })


    }, 100);
  }

}
