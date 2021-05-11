import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../../services/common.service'
import { LoaderService } from '../../shared/LoaderService';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { IonicToastService } from '../../services/ionic-toast.service';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  formControl: FormControl;
  show: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private dataService: DataService,
    private ionLoader: LoaderService,
    private router: Router,
    public formBuilder: FormBuilder,
    public ionicToastService: IonicToastService,
    public authenticationService: AuthenticationService,
    public toastCtrl: ToastController) {
    this.show = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  // click event function toggle
  showPassword() {
    this.show = !this.show;
  }

  onLogin() {
    this.ionLoader.showLoader();
    setTimeout(() => {
      var userData = { 'username': this.loginForm.value.email, 'password': this.loginForm.value.password };

      this.dataService.AuthenticateUser(userData).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        console.log("Succcess" + data);
        var myJSON = JSON.stringify(data);
        var obj = JSON.parse(myJSON);
        this.ionLoader.hideLoader();
        //this.authenticationService.login(obj.token, this.username)
        this.openSuccessToast();

        this.router.navigate(['/tabs/tab1'])
      },
        error => {
          this.ionLoader.hideLoader();
          console.log('Something goes wrong', error);
          this.openFailToast("Invalid Credentials.");
        }
      )

    }, 100);

  }

  async openSuccessToast() {
    this.toastCtrl.create({
      header: 'Login Successful',
      duration: 3000,
    }).then(res => {
      res.present();

    });
  }

  async openFailToast(error: string) {

    this.toastCtrl.create({
      header: 'Login failed due to following error-',
      duration: 5000,
      message: error,
    }).then(res => {
      res.present();

    });

  }

}
