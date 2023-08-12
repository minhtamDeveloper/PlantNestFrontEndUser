import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { UserstoreService } from 'src/app/service/userstore/userstore.service';

@Component({
  selector: 'app-root',
  templateUrl: './user.component.html'
})
export class UsersComponent implements OnInit {

  public id: string;
  public username: string = "";
  check: boolean = false;

  constructor(private loginService: LoginService, private userStoreService: UserstoreService,private router : Router) {

  }
  ngOnInit() {
    this.userStoreService.getUsernameFormStore().subscribe(val => {
      let usernameFormToken = this.loginService.getUsernameFromToken();
      this.username = val || usernameFormToken
     
    })
    this.userStoreService.getIdFormStore().subscribe(val => {
      let idFormToken = this.loginService.getIdFromToken();
      this.id = val || idFormToken

    })

    this.userStoreService.getRoleFormStore().subscribe(val => {
      let idFormToken = this.loginService.getRoleFromToken();
      console.log(idFormToken)
    })
   
    if (this.id != null || this.id != undefined) {
      this.check = true;
    }
    else {
      this.check = false;
    }
    
  }
  signOut() {
    this.check = false
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
