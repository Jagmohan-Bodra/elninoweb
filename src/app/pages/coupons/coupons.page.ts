import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage implements OnInit {
  coupons: any;
  constructor() {
    this.coupons = new Array(2);
  }

  ngOnInit() {
  }

}
