import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user/user.service';
import Swal from 'sweetalert2';
import { AccountModel } from '../model/account.model';
import { RouterTestingHarness } from '@angular/router/testing';

@Component({
  selector: 'app-root',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit  {
  form: FormGroup;
  constructor(
    private userService: UserService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    ){

  }
  ngOnInit(){
    this.form = this.formBuilder.group({
      fullname :["",[Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      username :["",[Validators.required, Validators.minLength(3), Validators.maxLength(250),Validators.pattern("^[a-zA-Z0-9_.-]*$")]],
      password :["",[Validators.required, Validators.minLength(6), Validators.maxLength(250),Validators.pattern("^[a-zA-Z0-9_.-]*$")]],
      //Minimum six characters, at least one uppercase letter, one lowercase letter and one number:
      email :["",[Validators.required, Validators.minLength(3), Validators.maxLength(250),Validators.pattern("[a-z0-9]+@[a-z]+\.[a-z]{2,3}")]],
      phone :["",[Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      address :["",[Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      dob :["",Validators.required],

    })
  }
  save (){
    
      var user : AccountModel = this.form.value as AccountModel
      console.log(user)
      var formData = new FormData();
      formData.append("strAccount",JSON.stringify(user))
      this.userService.resgiter(formData).then(
        res=>{
          Swal.fire({
            icon: 'success',
            title: 'CONGRATULATIONS',
            text: 'Your Registration Has Been Successful !',
          })
        },err=>{
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong! User Registration failed. '+err['error'],
          })
        }
      )
  }
}
