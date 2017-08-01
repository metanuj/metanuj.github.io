import {Component} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
    selector:'',
    templateUrl:'./contactList.component.html',
    styleUrls:['./css/contactList.css']
})

export class ContactListComponent {
   uArray:any;
   id:number;
   sid:number;
   saveIButton:boolean;
   updateIButton:boolean;

   constructor(){this.uArray=[], this.id=0; this.saveIButton = true, this.updateIButton=false;}
    saveInfo(form:NgForm) {
       // console.log(form.value);
        //console.log("User name: "+ form.value.cname + form.value.cphone);
        this.uArray.push({
            id:this.id++, 
            name:form.value.cname, 
            phone:form.value.cphone
        });
        console.log("update Array" + JSON.stringify(this.uArray));
        //console.log("Array"+ this.cArray);
        form.reset();
    }
    editContactList(form:NgForm,list, i){
        //console.log("Edit list "+ list.name + "index " + i);
       form.setValue({
           cname:list.name,
           cphone:list.phone
       })
       this.sid=list.id;
       this.saveIButton = false;
       this.updateIButton = true;
    }
    updateInfo(form:NgForm){
        console.log("clicked");
            for(let j=0; j < this.uArray.length; j++) {
                if(this.uArray[j].id == this.sid){
                    this.uArray[j].name=form.value.cname;
                    this.uArray[j].phone=form.value.cphone;
                }
            //this.uArray = this.uArray.filter((item) => {
                //console.log("item id"+ item.id+ "this.sid "+ this.sid);
                
              //  if(item.id === this.sid){
                   // return((item.name=form.value.cname) && (item.phone = form.value.cphone));
                   
               // }
           // });
            }
            console.log("this.uArray" + this.uArray);
            form.reset();
            this.saveIButton = true;
            this.updateIButton = false;
    }
    removeElement(indx){
        this.uArray.splice(indx,1);
    }
}