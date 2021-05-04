import { Injectable, Inject } from '@angular/core';
@Injectable()
export class GlobalService {
  resourceBaseUrl: string = "";
  hostURL: string = "";
  UserId: number = 0;
  UserType: number = 0;
  UserTypeName: string = "";
  AccountType: number = 0;
  loggedInUser: any;
  DisplayName: string = "";
  NoRecords: string;
  LoginId: string = "";
  ProtocolType: string = "";
  error;
  public href: string = "";
  constructor() {
    this.loggedInUser = JSON.parse(localStorage.getItem("loggedInDetails"));
    if (this.loggedInUser != null) {
      this.UserId = this.loggedInUser.Id;
      this.UserType = this.loggedInUser.UserTypeId;
      this.UserTypeName = this.loggedInUser.UserType;
      this.DisplayName = this.loggedInUser.FirstName + " " + this.loggedInUser.LastName;
      this.LoginId = this.loggedInUser.LoginId;
    }

    this.NoRecords = 'No Record Found.';

    //this.hostURL = "https://infinite-mountain-21059.herokuapp.com/api/";
    this.hostURL = "https://elninohub.com:8001/api/";
    //this.hostURL = "http://localhost:8000/api/";


    // get protocol type
    //this.ProtocolType = window.location.protocol + "//";
    this.resourceBaseUrl = this.hostURL;


    // if (window.location.host == "localhost") {
    //   // for 'ng serve --open' command
    //   //**** for localhost:4200 *****//
    //   this.resourceBaseUrl = this.hostURL;
    // }
    // else {
    //   // get hosted url on uat and prod  server
    //   this.resourceBaseUrl = window.location.origin + "/API/Adminapi/";

    // }
    // //LocalHost
    // if (this.resourceBaseUrl == this.ProtocolType + "localhost/API/Adminapi/") {
    //   if (window.location.host == "localhost:8100") {
    //     // for 'ng serve --open' command
    //     //**** for localhost:4200 *****//
    //     localStorage.setItem('loggedInDetails', JSON.stringify(
    //       {
    //         "Id": 1, "FirstName": "Birendra", "LastName": "Kumar", "EmailId": "birendrak@gmail.com", "LoginId": "superadmin", "Password": "ebix@2016"
    //       }));
    //   }

    // }
    // QA
    // if ((this.resourceBaseUrl == this.ProtocolType + "qa.beta.interactiveanatomy.com/API/Adminapi/")
    //   || (this.resourceBaseUrl == this.ProtocolType + "www.qa.beta.interactiveanatomy.com/API/Adminapi/")) {

    // }

    // // Live
    // if ((this.resourceBaseUrl == this.ProtocolType + "interactiveanatomy.com/API/Adminapi/")
    //   || (this.resourceBaseUrl == this.ProtocolType + "www.interactiveanatomy.com/API/Adminapi/")) {

    // }

  }

}




