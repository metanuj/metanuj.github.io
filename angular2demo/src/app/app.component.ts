import {Component} from '@angular/core';
import {appService} from './services/app.service';
@Component({
  selector: 'app-root',
  //template: '<product-form></product-form>', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[appService]
})
export class AppComponent {
  title: string = "Custom code";
  titleStatus: boolean = false;
  appList: any[] = [{
    "ID":"1",
    "Name":"NC"
  },
  {
    "ID":"2",
    "Name":"Tanuj"
  },
  {
    "ID":"3",
    "Name":"Bob"
  }];
  value: string = "";
  constructor(private _appService: appService){}
  ngOnInit():void {
    this.value = this._appService.getApp();
  }
  name: string = "I/O example";
  setName(newName: string) {
    this.name = newName;
  }
}