import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../services/common.service';
import { ToastController } from '@ionic/angular';
import { AlertController, NavController } from '@ionic/angular';
import { CartService } from '../services/cart.service';

import { AuthenticationService } from '../services/authentication.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '../app.component';
import { TranslateConfigService } from '../services/translate-config.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})

export class Tab5Page implements OnInit {
  cart = [];
  cartItems = [];
  userData: any;
  userOrders: any;
  username: string = 'Guest';
  password: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  birthdate: string;
  userinfo: any;
  account: string = "profile";
  base64Image: any = "http://www.gravatar.com/avatar?d=mm&s=140";
  lang: any;
  checked = false;
  constructor(
    private dataService: DataService,
    private router: Router,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public nav: NavController,
    private cartService: CartService,
    private nativeStorage: NativeStorage,
    private translate: TranslateService,
    public MyTranslate: TranslateConfigService,
    public appComponent: AppComponent,
    private authenticationService: AuthenticationService,
  ) {
    // this.lang = 'en';
    // this.translate.setDefaultLang('en');
    // this.translate.use('en');
  }

  // switchLanguage() {
  //   if (this.lang == 'en') {
  //     this.translate.setTranslation('en', defaultLanguage);
  //     this.translate.setDefaultLang('en');
  //   }
  //   else {
  //     this.translate.setTranslation('ar', arabicLanguage);
  //     this.translate.setDefaultLang('ar');
  //   }

  //   this.appComponent.useLanguage(this.lang);
  // }

  ngOnInit() {
    this.cartItems = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
  }
  openCart() {
    this.router.navigate(['tabs/tab4']);
  }
  // languageChanged() {
  //   this.translateConfigService.setLanguage(this.selectedLanguage);
  // }

  getuserdata() {
    this.nativeStorage.getItem('userInfo')
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }

  ionViewWillEnter() {
    if (!this.authenticationService.checkToken()) {
      this.router.navigate(['login']);
    }
    else {
      this.userinfo = this.authenticationService.checkTokenNew();
      var myJSON = JSON.stringify(this.userinfo);
      var obj = JSON.parse(myJSON);
      this.username = obj.user_name;
    }


    var lang = this.MyTranslate.getCurrentLanguage();
    this.lang = lang;
    if (lang == "en") {
      this.checked = false;
      this.MyTranslate.setLanguage(this.checked);
      this.appComponent.useLanguage(this.lang);
    }
    else {
      this.checked = true;
      this.MyTranslate.setLanguage(this.checked);
      this.appComponent.useLanguage(this.lang);
    }

  }
  Clicked() {
    //this.checked = !this.checked;
    this.MyTranslate.setLanguage(this.checked);
    var lang = this.MyTranslate.getCurrentLanguage();
    this.lang = lang;
    this.appComponent.useLanguage(this.lang);
  }
  //ngOnInit() {
  //this.userOrders = new Array(10);
  // if (!this.authenticationService.isAuthenticated()) {
  //   this.router.navigate(['login'])
  // }

  //}

  updatePicture() {
    // let options = {
    //   quality: 100,   // Specify quality in number 0-100
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   sourceType: this.camera.PictureSourceType.CAMERA,   // camera or gallery
    //   allowEdit: true,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   targetWidth: 100,
    //   targetHeight: 100,
    //   saveToPhotoAlbum: true,
    //   correctOrientation: true,
    //   cameraDirection: 0// BACK 0, FRONT 1
    // };

    // this.camera.getPicture(options).then((imageData) => {
    //   console.log(imageData);
    //   this.base64Image = 'data:image/jpeg;base64,' + imageData;

    // }, (err) => {
    //   // Handle error
    // });
    // console.log('Clicked to update picture');
  }

  // Present an alert for adding date of birth
  // clicking OK will update the DOB
  // clicking Cancel will close the alert and do nothing


  changePassword() {
    console.log('Clicked to change password');
  }
  addDOB() {

  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['tabs/tab1']);
    console.log('logout');
  }

  support() {
    //this.nav.push(SupportPage);
  }
}
