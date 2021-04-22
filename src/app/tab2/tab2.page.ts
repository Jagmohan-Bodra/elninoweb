import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  cards: any;
  category: string = 'gear';

  constructor(public navCtrl: NavController) {
    this.cards = new Array(10);
  }

}
