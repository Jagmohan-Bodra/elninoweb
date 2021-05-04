import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.page.html',
  styleUrls: ['./shipping-address.page.scss'],
})
export class ShippingAddressPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ShippingAddress(form) {
    this.router.navigateByUrl('checkout');

  }

}
