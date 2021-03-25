import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from '../services/common.service';
import { LoaderService } from '../shared/LoaderService';
import { GlobalService } from '../shared/global';
import { ValidationMesaage } from '../validation/ValidationMessage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validation_messages={};

  destroy$: Subject<boolean> = new Subject<boolean>();
  registerForm:FormGroup;
  profileForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private validation :ValidationMesaage,private navCtrl:NavController,private alertCtrl:AlertController,private dataService:DataService, private ionLoader: LoaderService,private globalService: GlobalService) 
  { 
    this.validation_messages=this.validation.validation_messages
  }

  ngOnInit() {
    this.registerForm=this.formBuilder.group({
      emailId:['',[Validators.required,Validators.minLength(10),Validators.maxLength(40)]],
      password:['',[Validators.required,Validators.minLength(5)]], 
      confirmPassword:['',[Validators.required]],
    },{validator: this.MatchPassword.bind(this)}); 
       
   
  }
  MatchPassword(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
   
    if(password === confirmPassword)
    {
      formGroup.get('confirmPassword').setErrors(null) ;
    }
    else
    {
      if(confirmPassword=="")
      {
        formGroup.get('confirmPassword').setErrors({ required: true }) ;
      }
      else
      {
        formGroup.get('confirmPassword').setErrors({ passwordNotMatch: true }) ;
      }
     
    }

  }

   register() {
    this.ionLoader.showLoader();
   
    setTimeout(() => {  
      this.dataService.RegisterToElninohub(this.registerForm.value).pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
        var myJSON = JSON.stringify(data);
        var obj = JSON.parse(myJSON);
        this.ionLoader.hideLoader(); 
        this.navCtrl.navigateRoot('/login');
      },
      error => {
        console.log('oops', error);
        this.ionLoader.hideLoader(); 
        this.alertCtrl.create({
          header: 'Registration Error',
          subHeader: '',
          message: error +'.<br> Please try again',
          buttons: ['OK']
        }).then(res => {
          res.present();
  
        });
      }) 

   }, 100);  
    
  }

}
