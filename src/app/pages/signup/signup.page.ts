import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '../../services/common.service';
import { LoaderService } from '../../shared/LoaderService';
import { ValidationMesaage } from '../validation/ValidationMessage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  registerForm: FormGroup;
  show: boolean;
  showConfirm: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();

  validation_messages = {};

  constructor(private dataService: DataService,
    private ionLoader: LoaderService,
    private router: Router,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public validation: ValidationMesaage) {
    this.validation_messages = this.validation.validation_messages;
    this.show = false;
    this.showConfirm = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.MatchPassword.bind(this) });

  }
  MatchPassword(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');

    if (password === confirmPassword) {
      formGroup.get('confirmPassword').setErrors(null);
    }
    else {
      if (confirmPassword == "") {
        formGroup.get('confirmPassword').setErrors({ required: true });
      }
      else {
        formGroup.get('confirmPassword').setErrors({ passwordNotMatch: true });
      }

    }

  }

  showPassword() {
    this.show = !this.show;
  }

  showConfirmPassword() {
    this.showConfirm = !this.showConfirm;
  }


  register() {
    this.ionLoader.showLoader();

    setTimeout(() => {
      var userData = { 'username': this.registerForm.value.username, 'email': this.registerForm.value.email, 'password1': this.registerForm.value.password, 'password2': this.registerForm.value.confirmPassword };

      this.dataService.RegisterUser(userData).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        console.log(data);
        console.log('User successfully created with name ' + data);
        this.ionLoader.hideLoader();
        this.openSuccessToast();
        this.router.navigate(['/tabs/tab5'])
      },
        error => {
          this.ionLoader.hideLoader();
          console.log('something goes wrong', error);
          this.openFailToast(error);
        }
      )

    }, 100);

  }

  async openSuccessToast() {
    this.toastCtrl.create({
      header: 'Login Successful',
      duration: 5000,
    }).then(res => {
      res.present();

    });
  }

  async openFailToast(error: string) {
    this.toastCtrl.create({
      header: 'Registration failed due to following error-',
      duration: 10000,
      message: error,
    }).then(res => {
      res.present();

    });

  }

}
