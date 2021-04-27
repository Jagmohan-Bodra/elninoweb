import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../services/common.service';
import { ToastController } from '@ionic/angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/Authentication.service';
import { TranslateConfigService } from '../services/translate-config.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  selectedLanguage: string;
  userData: any;
  userOrders: any;
  username: string = "Guest";
  password: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  birthdate: string;
  account: string = "profile";
  base64Image: any = "http://www.gravatar.com/avatar?d=mm&s=140";

  constructor(
    private dataService: DataService,
    private router: Router,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public nav: NavController,
    private authenticationService: AuthenticationService,
    private translateConfigService: TranslateConfigService
    //public user: User,
    //public userService: UserService,
    //public camera: Camera
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  // ionViewWillEnter() {
  //   if (!this.authenticationService.isAuthenticated()) {
  //     this.router.navigate(['login'])
  //   }
  // }

  ngOnInit() {
    this.userOrders = new Array(10);
    // if (!this.authenticationService.isAuthenticated()) {
    //   this.router.navigate(['login'])
    // }

  }

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
    //this.userService.logout();
    //this.nav.setRoot(LoginPage);
  }

  support() {
    //this.nav.push(SupportPage);
  }

}
