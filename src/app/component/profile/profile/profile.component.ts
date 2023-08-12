import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountModel } from 'src/app/model/account.model';
import { LoginService } from 'src/app/service/login/login.service';
import { UserService } from 'src/app/service/user/user.service';
import { UserstoreService } from 'src/app/service/userstore/userstore.service';
import Swal from 'sweetalert2';

@Component({

  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  photo: File;
  photoName: string
  id: string;
  form: FormGroup;
  user: AccountModel;
  check: boolean = false;
  checkUpload: boolean = false;
  dinabled:boolean=false;
  constructor(private loginService: LoginService,
    private userService: UserService,
    private userStoreService: UserstoreService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {

  }
  ngOnInit() {
    this.userStoreService.getIdFormStore().subscribe(val => {
      let usernameFormToken = this.loginService.getIdFromToken();
      this.id = val || usernameFormToken
      this.userService.findById(this.id).then(
        res => {
          this.user = res as AccountModel;
          this.form = this.formBuilder.group({
            id: [this.user.id],
            fullname: [this.user.fullName, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
            username: [this.user.userName.substring(0, 4) + "********", [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
            //           password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(250), Validators.pattern("^[a-zA-Z0-9_.-]*$")]],
            //Minimum six characters, at least one uppercase letter, one lowercase letter and one number:
            email: [this.user.email, [Validators.required, Validators.minLength(3), Validators.maxLength(250), Validators.pattern("[a-z0-9]+@[a-z]+\.[a-z]{2,3}")]],
            phone: [this.user.phone, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
            address: [this.user.address, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
            dob: [this.user.dob, Validators.required],
          })
        }, err => console.log(err)
      )
    })
  }
  change() {
    this.check = true
  }
  save() {
    var user: AccountModel = this.form.value as AccountModel
    console.log(user)
    var formData = new FormData();
    formData.append("strAccount", JSON.stringify(user))
    this.userService.update(this.id, formData).then(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'Successfully updated your personal information!',
        })
        this.check = false
      }, err => {
        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong!' + err['error'],
        })
      }
    )
  }
  uploadAvt() {
    this.checkUpload = true;
  }
  selectPhoto(evn: any) {
    this.photo = evn.target.files[0]
   this.photoName = "Image has been selected!"
   this.dinabled = true;
  }
  saveAvt() {
    if(this.photo !=null) {
      var formData = new FormData();
      formData.append("file",this.photo);
      this.userService.updateAvt(this.id, formData).then(
        res=>{
          this.checkUpload = false
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Successfully updated your personal avatar!',
          })
          this.router.navigate(['/profile'])
        },err=>{
          this.checkUpload = false
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong! ' + err['error'],
          })
        }
      )
    }
    else{
      this.checkUpload = false
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: "File shoundn't empty!",
      })
    }
  }
}
