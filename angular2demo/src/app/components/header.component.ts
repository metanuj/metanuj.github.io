import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector:'layout-header',
    templateUrl:'header.component.html'
})

export class HeaderConponent {
    constructor(){}
    // name: string = "Hello, Header Section";
    @Input() name: string;
    @Output() onNameChanged = new EventEmitter<string>();

    changeName(newName : string) {
        this.onNameChanged.emit(newName);
    }
}