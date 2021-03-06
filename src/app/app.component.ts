import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any;

  constructor() { }
  sideMenu() {
    this.navigate =
      [
        {
          title: "Home",
          url: "/",
          icon: "home"
        },
        {
          title: "Products",
          url: "/",
          icon: "chatboxes"
        },
        {
          title: "Accounts",
          url: "/",
          icon: "contacts"
        },
      ]
  }
}
