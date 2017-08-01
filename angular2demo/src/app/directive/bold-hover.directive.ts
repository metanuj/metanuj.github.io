import {Directive, ElementRef} from '@angular/core';

@Directive({
    selector: '[boldHover]',
    host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class BoldHoverDirective {
    private element: HTMLElement;
    constructor(elementRef: ElementRef){
        this.element = elementRef.nativeElement;
    }
    onmouseenter(){
        this.element.style.fontWeight = 'bold';
    }
    onmouseleave(){
        this.element.style.fontWeight = 'normal';
    }
}