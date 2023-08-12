import { CanActivateFn } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { ɵɵinject } from '@angular/core';
import { UserstoreService } from '../service/userstore/userstore.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const login = ɵɵinject(LoginService)
  const loginStore = ɵɵinject(UserstoreService)
  var role = "";
  loginStore.getRoleFormStore().subscribe(val=>{
    let roleLocal = login.getUsernameFromToken();
    role = val || roleLocal
    
})
  if(login.isLoginIn() && role=="Admin"){
    return true;
  }else{
    return false;
  }
};
