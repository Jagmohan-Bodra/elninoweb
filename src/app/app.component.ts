import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any;

  constructor(private navCtrl:NavController) {
    this.navCtrl.navigateRoot('login')
  }
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
