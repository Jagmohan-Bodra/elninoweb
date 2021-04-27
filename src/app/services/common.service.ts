import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { GlobalService } from '../shared/global';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  items: any[] = [];
  rotateImg = 0;

  constructor(private httpClient: HttpClient, private globalService: GlobalService) {

  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }



  GetProductList() {
    return this.httpClient.get(this.globalService.resourceBaseUrl + "products/").pipe(catchError(this.handleError));
  }

  GetNextProductList(nextURL) {
    return this.httpClient.get(nextURL).pipe(catchError(this.handleError));
  }

  getProductDetails(id) {
    return this.httpClient.get(this.globalService.resourceBaseUrl + "products/" + id + "/").pipe(catchError(this.handleError));
  }

  getProductPrice(id) {
    return this.httpClient.get(this.globalService.resourceBaseUrl + "products/" + id + "/price/").pipe(catchError(this.handleError));
  }

  //get item list
  myItemList() {
    return this.items;
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  GetAllCetogories() {
    return this.httpClient.get(this.globalService.resourceBaseUrl + "categories/").pipe(catchError(this.handleError));
  }
  getProductsByCategoryID(data: number) {
    //return this.httpClient.get(this.globalService.resourceBaseUrl +)
  }

  AuthenticateUser(data: any) {
    return this.httpClient.post(this.globalService.resourceBaseUrl + "v1/login/", JSON.parse(data)).pipe(catchError(this.handleError))
  }
  RegisterUser(data: any) {
    return this.httpClient.post(this.globalService.resourceBaseUrl + "v1/rest-auth/registration/", JSON.parse(data), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
      }
    }).pipe(catchError(this.handleError))
  }



}
