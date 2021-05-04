import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../../services/common.service'
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IonicToastService } from '../../services/ionic-toast.service';
import { AuthenticationService } from '../../services/Authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  userData: any;
  username: string;
  password: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private dataService: DataService,
    private router: Router,
    public formBuilder: FormBuilder,
    private ionicToastService: IonicToastService,
    private authenticationService: AuthenticationService,
    public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

  login() {
    this.userData = {
      "username": this.username,
      "password": this.password
    }

    this.dataService.AuthenticateUser(JSON.stringify(this.userData)).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      console.log("Succcess" + data);
      var myJSON = JSON.stringify(data);
      var obj = JSON.parse(myJSON);
      this.authenticationService.login(obj.token, this.username)
      this.openSuccessToast();
      //this.showToast('top');
      ///this.ionicToastService.showToast('Succcess');
      this.router.navigate(['/tabs/tab1'])
    },
      error => {
        this.openFailToast();
        //this.showToast('top');
        this.ionicToastService.showToast('Error');
        console.log('Something goes wrong', error)
      }
    )
  }

  async showToast(position: any) {
    const toast = await this.toastCtrl.create({
      message: 'Mmmm, buttered toast',
      duration: 1000,
      position,
      color: 'tertiary',
      cssClass: 'toast-1-css',
    });
    toast.present();
  }

  async openSuccessToast() {
    const toast = await this.toastCtrl.create({
      message: 'Login Successful',
      duration: 3000
    });
    toast.present();
  }

  async openFailToast() {
    const toast = await this.toastCtrl.create({
      message: 'Login Unsuccessful',
      // position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
    }
  }

}
