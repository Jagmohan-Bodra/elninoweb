import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicToastService } from '../services/ionic-toast.service';

//const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userInfo = {};
  public authenticationState = new BehaviorSubject(false);
  public isAuthneticate: boolean = false;
  constructor(
    public storage: Storage,
    public plt: Platform,
    public nativeStorage: NativeStorage,
    public ionicToastService: IonicToastService,
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.nativeStorage.getItem('userInfo')
      .then(
        data => { this.isAuthneticate = true; },
        error => console.log(error)
      );
    if (this.isAuthneticate) {
      return true;
    }
    else {
      return false;
    }
  }

  checkTokenNew() {
    return this.nativeStorage.getItem('userInfo')
      .then(
        data => { this.userInfo = data; },
        error => console.log(error)
      );
    //this.userInfo;
  }


  login(token: string, name: string) {
    var userInfo = {
      token: token,
      user_name: name
    };
    this.nativeStorage.setItem('userInfo', userInfo)
      .then(
        () => {
          this.isAuthneticate = true;
          console.log(this.isAuthneticate);
          this.authenticationState.next(true);
          //this.ionicToastService.showToast('Saving user info');
        },
        error => this.ionicToastService.showToast('Error saving user info')
      );
  }

  logout() {
    this.nativeStorage.remove('userInfo')
      .then(
        data => {
          this.isAuthneticate = false;
          this.authenticationState.next(false);
          console.log(data);
          console.log('1:logout:' + this.authenticationState.value);
          console.log('2:logout:' + this.isAuthneticate);
        },
        error => console.error('error while logout')
      );
  }

  isAuthenticated() {
    console.log('1:check:' + this.authenticationState.value);
    console.log('2:check:' + this.isAuthneticate);
    return this.isAuthneticate;

  }

  isAuthenticatedNew() {
    return this.authenticationState.value;
  }
}
