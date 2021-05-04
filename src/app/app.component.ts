import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/Authentication.service';
import { TranslateService } from '@ngx-translate/core';
import defaultLanguage from "./../assets/i18n/en.json";
import arabicLanguage from "./../assets/i18n/ar.json";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any;

  constructor(
    private router: Router,
    private platform: Platform,
    private translate: TranslateService,
    //private splashScreen: SplashScreen,
    //private statusBar: StatusBar,
    private authenticationService: AuthenticationService
  ) {
    this.initializeApp();
    translate.setTranslation('en', defaultLanguage);
    translate.setDefaultLang('en');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this._initTranslate();
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();

      // this.authenticationService.authenticationState.subscribe(state => {
      //   if (state) {
      //     this.router.navigate(['dashboard']);
      //   } else {
      //     this.router.navigate(['tabs/tab1']);
      //   }
      // });

    });
  }
  useLanguage(language: string): void {
    this.translate.use(language);
  }
  // private _initTranslate() {
  //   // Set the default language for translation strings, and the current language.
  //   this._translate.setDefaultLang('en');


  //   if (this._translate.getBrowserLang() !== undefined) {
  //     this._translate.use(this._translate.getBrowserLang());
  //   }
  //   else {
  //     this._translate.use('en'); // Set your language here
  //   }
  // }



  // sideMenu() {
  //   this.navigate =
  //     [
  //       {
  //         title: "Home",
  //         url: "/",
  //         icon: "home"
  //       },
  //       {
  //         title: "Products",
  //         url: "/",
  //         icon: "chatboxes"
  //       },
  //       {
  //         title: "Accounts",
  //         url: "/",
  //         icon: "contacts"
  //       },
  //     ]
  // }
}
