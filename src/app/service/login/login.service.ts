import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BaseUrlService } from '../baseUrl.service';
import { lastValueFrom } from 'rxjs';
import { AccountModel } from 'src/app/model/account.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private payload: any;
  constructor(private http: HttpClient,
    private url: BaseUrlService,
    private router: Router,

  ) {
    this.payload = this.decodedToken();
   }
  private baseUrl: string = String(this.url.getBaseUrl() + "api/Login/");

  tokenResposen: any;

  async processLogin(data: FormData) {
    return await lastValueFrom(this.http.post(this.baseUrl + "login", data));
  }

  storeToken(tokenValue: any) {
    return localStorage.setItem("token", tokenValue);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  isLoginIn(): boolean {
    return !!localStorage.getItem("token")
  }

  signout() {
    localStorage.clear()
    this.router.navigate(["/login"])
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    return jwtHelper.decodeToken(token);
  }

  getIdFromToken(){
    if(this.payload)
    return this.payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }

  getRoleFromToken(){
    if(this.payload)
    return this.payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }
  
  getUsernameFromToken(){
    if(this.payload)
    return this.payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }
}

