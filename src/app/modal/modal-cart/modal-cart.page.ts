import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.page.html',
  styleUrls: ['./modal-cart.page.scss'],
})
export class ModalCartPage implements OnInit {

 @Input() model_title: string;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
   async closeModel() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

}
