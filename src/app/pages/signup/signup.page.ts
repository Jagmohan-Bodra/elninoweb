import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/services/common.service';

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

  constructor(private dataService: DataService, private router: Router) { }

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
      this.router.navigate(['/tabs/tab5'])
    },
      error => {
        console.log('something goes wrong', error);
      }
    )
  }
}
