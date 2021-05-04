import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from '../../services/common.service';
import { LoaderService } from '../../shared/LoaderService';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.page.html',
  styleUrls: ['./all-categories.page.scss'],
})
export class AllCategoriesPage implements OnInit {
  Allcategories = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private dataService: DataService,
    private ionLoader: LoaderService) { }

  ngOnInit() {
    this.ionLoader.showLoader();
    this.loadCategories();
  }

  loadCategories() {
    this.dataService.GetAllCetogories().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      var myJSON = JSON.stringify(data);
      var obj = JSON.parse(myJSON);
      this.Allcategories = obj.results;
      this.ionLoader.hideLoader();
    },
      error => {
        console.log('oops', error);
        this.ionLoader.hideLoader();
      })
  }
}
