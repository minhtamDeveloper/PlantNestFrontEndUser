import { ɵɵinject, ɵɵngDeclareInjectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const login = ɵɵinject(LoginService)
  if(login.isLoginIn()){
    return true;
  }else{
    return false;
  }
};
