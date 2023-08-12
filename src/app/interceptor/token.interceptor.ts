import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const mytoken = this.loginService.getToken();
    if(mytoken){
      request = request.clone(
        {
          setHeaders:{Authorization: 'Bearer ' + mytoken}
        }
      );
    }
    return next.handle(request);
  }
}
