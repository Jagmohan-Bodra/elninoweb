import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../services/common.service';
import { ToastController } from '@ionic/angular';
import { IonicToastService } from '../../services/ionic-toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  username: string;
  email: string;
  password: string;
  confirmpassword: string;
  signupData: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService, private router: Router,
    public toastCtrl: ToastController,
    private ionicToastService: IonicToastService,
  ) { }

  ngOnInit() {
  }

  signup() {
    this.signupData = {
      "username": this.username,
      "email": this.email,
      "password1": this.password,
      "password2": this.confirmpassword
    }

    this.dataService.RegisterUser(JSON.stringify(this.signupData)).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      console.log(data);
      console.log('User successfully created with name ' + data);
      this.openSuccessToast();
      this.router.navigate(['login'])
    },
      error => {
        console.log('something goes wrong', error);
        //this.openFailToast();
        this.ionicToastService.showToast(error);
      }
    )
  }

  async openSuccessToast() {
    const toast = await this.toastCtrl.create({
      message: 'User created successfully ! Please login.',
      duration: 5000
    });
    toast.present();
  }

  async openFailToast() {
    const toast = await this.toastCtrl.create({
      message: 'Registration Unsuccessful!',
      // position: 'middle',
      duration: 5000
    });
    toast.present();
  }
}
