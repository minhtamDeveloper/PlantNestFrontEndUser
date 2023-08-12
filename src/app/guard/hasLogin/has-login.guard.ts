import { inject, ɵɵinject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';

export const hasLoginGuard: CanActivateFn = (route, state) => {
  const login = ɵɵinject(LoginService)
  const router = inject(Router)
  console.log(login.isLoginIn())
  if(login.isLoginIn()){
    return false;
  }else{
    return true;
  }
};
