import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-info',
  templateUrl: './seller-info.page.html',
  styleUrls: ['./seller-info.page.scss'],
})
export class SellerInfoPage implements OnInit {
  SellerName: string = "Elninohub";
  constructor() { }

  ngOnInit() {
    this.SellerName = "Elninohubu";
  }

}
