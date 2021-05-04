import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderService } from '../../shared/LoaderService';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  resourcePath: string;
  resultMassege: string;
  url = 'http://saib.gate2play.com/hussam/ionicserverside.php';
  options = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };

  constructor(
    private route: ActivatedRoute,
    private ionLoader: LoaderService,
    private router: Router,
    public http: HttpClient) {
    this.route.queryParams.subscribe((params) => {
      if (params && params.resourcePath) {
        this.resourcePath = params.resourcePath;
      }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.ionLoader.showLoader();
    console.log(this.resourcePath);
    //	let message: string;
    console.log('hi');
    let data = {
      method: 'check_payment',
      resourcePath: this.resourcePath
    };

    this.http.post(this.url, data, this.options).subscribe(
      (data) => {
        console.log(data);
        this.resultMassege = data['message'];
        console.log(this.resultMassege);
        this.ionLoader.hideLoader();
      },
      (error) => {
        console.log(error);
        this.ionLoader.hideLoader();
      }
    );
  }

}
