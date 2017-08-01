import {Component } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

// function for has !
function hasExclamationMark(input: FormControl) {
    const hasExclamation = input.value.indexOf('!') >= 0;
    return hasExclamation ? null : { needsExclamation: true };
}

// function for has punctuation
function hasPunctuation(punctuation: string, errorType: string){
    return function(input:FormControl){
        return input.value.indexOf(punctuation) >= 0 ? null : {[errorType]:true} 
    }
}

@Component({
    selector:'',
    templateUrl:'./reactiveForm.component.html'
})

export class ReactiveFormComponent {
    username = new FormControl('',[
        Validators.required,
        Validators.minLength(5)
    ]);
    password = new FormControl('',[Validators.required, hasExclamationMark,hasPunctuation('&','ampersandRequired')]);
    
    constructor(private builder : FormBuilder){}

    loginForm: FormGroup= this.builder.group({
        username :this.username,
        password : this.password
    });
    
    login(){
        console.log("Form values"+ this.loginForm.value)
    }
}
