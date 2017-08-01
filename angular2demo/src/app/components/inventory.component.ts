import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector:'app-links',
    template:"Inventory <a class = 'button' (click) = 'onBack()'><< Back to Products</a>"
})
export class AppInventory{
    private id: number;
    private sub: any;
    constructor( private _router : ActivatedRoute, private _back : Router) {}
   private ngOnInit(){
    this.sub = this._router.params.subscribe(params => {
        this.id = +params['id'];
    });
   }
   
  onBack(){
      this._back.navigate(['product']);
  }
}