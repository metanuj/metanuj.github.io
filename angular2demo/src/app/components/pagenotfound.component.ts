import { Component } from '@angular/core';
import {OnInit, OnDestroy} from '@angular/core';

@Component({
    selector:'app-links',
    template:'Page Not found'
})

export class PageNotFound implements OnInit, OnDestroy {
    ngOnInit() { console.log('onInit'); }

  ngOnDestroy() { console.log('onDestroy'); }
}