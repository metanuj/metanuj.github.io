import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
    selector : 'contact-form',
    templateUrl:'contactForm.component.html'
})

export class contactFormComponent {
    registerUser(form: NgForm){
        console.log("form values "+ form.value);
        console.log("User name : " + form.value.uname + ", Age: " + form.value.age + ", Mobile: " + form.value.mobile);
       form.reset();
   }
   //userName = new FormControl();
   //userAge = new FormControl();
   //userPhone = new FormControl();
}