import { inject, ɵɵinject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';

export const authChildGuard: CanActivateChildFn = (childRoute, state) => {
  const login = ɵɵinject(LoginService)
  const router = inject(Router)
  
  if(login.isLoginIn()){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
