import { Component } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';

@Component({
    selector:'',
    templateUrl:'./reactiveScoth.component.html'
})

export class ReactiveScothComponent {
  complexForm : FormGroup;

  constructor(fb: FormBuilder){
    this.complexForm = fb.group({
        'firstName':[null, Validators.required],
        'lastName':[null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
        'gender':[null, Validators.required],
        'hiking':false,
        'running':false,
        'swimming':false
    })
  }
  submitForm(value:any):void{
      console.log("values:" + value);
      console.log("values:" + value.firstName);
  }
}