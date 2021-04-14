import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../services/common.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  userData: any;
  username: string;
  password: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private dataService: DataService, private router: Router, public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  login() {
    this.userData = {
      "username": this.username,
      "password": this.password
    }

    this.dataService.AuthenticateUser(JSON.stringify(this.userData)).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      console.log("Succcess" + data);
      this.openSuccessToast();
      this.router.navigate(['/tabs/tab1'])
    },
      error => {
        this.openFailToast();
        console.log('Something goes wrong', error)
      }
    )
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

}
