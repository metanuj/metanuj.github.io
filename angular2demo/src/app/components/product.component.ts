import { Component , Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector:'app-links',
    templateUrl:'login-form.html',
}) 
export class AppProduct {
    public userList: any[] = [];
    public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });
  constructor(public fb: FormBuilder) {this.userList=[];}
  doLogin(event) {
   // console.log(event);
   // console.log(this.loginForm.value);
    this.userList.push(this.loginForm.value);
   console.log("userlist: " + this.userList);
  }
  romoveList(rowIdx){
    //this.userList.pop();
    console.log("indx"+ rowIdx);
    //this.userList = this.userList.filter(item => item.id !== rowIdx);
    this.userList.splice(rowIdx, 1);
   // console.log("userlist: " + this.userList);
  }
}