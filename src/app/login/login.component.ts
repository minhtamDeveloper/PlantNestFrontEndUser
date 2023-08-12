import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountModel } from '../model/account.model';
import { JsonPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  //selector: 'app-root',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit  {
  form: FormGroup;
  constructor(
    private loginService: LoginService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    ){

  }
  ngOnInit(){
    this.form = this.formBuilder.group({
      username: ["",Validators.required],
      password: ["",Validators.required]
    })
  }
  submit(){
    var data : AccountModel = this.form.value as AccountModel
    var formData = new FormData();
    formData.append("data",JSON.stringify(data));
    this.loginService.processLogin(formData).then(
      res=>{
        var token = res as string;
        this.loginService.storeToken(token)
        this.router.navigate(['/home'])
        
      },err=>{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong! User Registration failed. '+err['error'],
          showConfirmButton: false,
            timer: 1500
        })
      }
    )
  }
}
