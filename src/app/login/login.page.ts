import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { NavController,AlertController } from '@ionic/angular';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from '../services/common.service';
import { LoaderService } from '../shared/LoaderService';
import { GlobalService } from '../shared/global';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  products = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private navCtrl:NavController,private alertCtrl:AlertController,private dataService:DataService, private ionLoader: LoaderService,private globalService: GlobalService) {  }
  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      emailId:['',[Validators.required,Validators.minLength(10),Validators.maxLength(40)]],
      password:['',[Validators.required,Validators.minLength(5)]]
    })
    
  }
  onLogin(){
    this.ionLoader.showLoader();
    setTimeout(() => {  
        this.dataService.GetLoginToElninohub(this.loginForm.value).pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
        var myJSON = JSON.stringify(data);
        var obj = JSON.parse(myJSON);
        this.ionLoader.hideLoader(); 
 
        this.globalService.tokenObject=obj;
        this.globalService.tokenValue=obj.token;
        this.navCtrl.navigateRoot('/tabs');
      },
      error => {
        console.log('oops', error);
        this.ionLoader.hideLoader(); 
        this.alertCtrl.create({
          header: 'Login Error',
          subHeader: '',
          message: error +'.<br> Please try again.',
          buttons: ['OK']
        }).then(res => {
          res.present();

        });
      }) 

     }, 100);
   
  }
  // ngOnDestroy() {
  //   this.destroy$.next(true);
  //   // Unsubscribe from the subject
  //   this.destroy$.unsubscribe();
  // }
}
