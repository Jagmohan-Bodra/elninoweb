import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonicToastService {
  private myToast: any;
  constructor(
    public toast: ToastController
  ) { }

  showToast(str: string) {
    this.myToast = this.toast.create({
      message: str,
      //position: 'b',
      duration: 2000
    }).then((toastData) => {
      toastData.present();
    });
  }
  HideToast() {
    this.myToast = this.toast.dismiss();
  }
}
