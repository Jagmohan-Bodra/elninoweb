import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  subscriber: any;
  constructor(public platform: Platform) {
    this.subscriber = this.platform.backButton.subscribeWithPriority(66666, () => {
      if (this.constructor.name == "TabsPage") {
        if (window.confirm("Are you sure want to exit app?")) {
          navigator["app"].exitApp();
        }
      }
    })
  }

}
