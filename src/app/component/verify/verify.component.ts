import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountModel } from 'src/app/model/account.model';
import { UserService } from 'src/app/service/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  check: boolean = true;
  form: FormGroup;
  form2: FormGroup;
  email: string = ""
  finaly: boolean=false
  form3: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(250), Validators.pattern("[a-z0-9]+@[a-z]+\.[a-z]{2,3}")]]
    })
    this.form2 = this.formBuilder.group({
      first: ["", Validators.required],
      second: ["", Validators.required],
      third: ["", Validators.required],
      fourth: ["", Validators.required],
      fifth: ["", Validators.required],
      sixth: ["", Validators.required]
    })

    this.form3 = this.formBuilder.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],

    })

  }
  sendCode() {
    var email = this.form.value as AccountModel;
    this.email = email.email
    var formData = new FormData();
    formData.append("strAccount", JSON.stringify(email));
    this.userService.sendCode(formData).then(
      res => {
        var check = res as boolean;
        if (check) {
          this.check = false
        }
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong!' + err['error'],
        })
      }
    )
  }

  verify() {
    var dataForOTP = this.form2.value as any;
    var code = dataForOTP['first'] + dataForOTP['second'] + dataForOTP['third'] + dataForOTP['fourth'] + dataForOTP['fifth'] + dataForOTP['sixth']
    var account = new AccountModel()
    account.email = this.email;
    account.sercurityCode = code
    var formData = new FormData();
    formData.append("strAccount", JSON.stringify(account));
    this.userService.verify(formData).then(
      res => {
        var result = res as boolean
        if (result) {
          this.check = null
          this.finaly = true
        }
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong!' + err['error'],
        })
      }
    )

  }
  resendCode() {
    var email = new AccountModel();
    email.email = this.email
    var formData = new FormData();
    formData.append("strAccount", JSON.stringify(email));
    this.userService.sendCode(formData).then(
      res => {
        var check = res as boolean;
        if (check) {
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Resend OTP Successfully!',
          })
        }
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong!' + err['error'],
        })
      }
    )
  }

  newPass() {
    var form3 = this.form3.value as any
    if (form3['password'] != form3['confirmPassword']) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong! New password and confirm password do not match.',
      })
    }else{
      var account = new AccountModel()
      account.email = this.email;
      account.password = form3['password']
      var formData = new FormData();
      formData.append("strAccount", JSON.stringify(account))
      this.userService.changePassword(formData).then(
        res=> {
          var result = res as boolean
          if(result){
            Swal.fire({
              icon: 'success',
              title: 'CONGRATULATIONS',
              text: 'Change Password Successfully!',
            })
            this.router.navigate(['/login'])
          }
        },err=> {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong! '+err['error'],
          })
        }
      )
    }
  }

}
