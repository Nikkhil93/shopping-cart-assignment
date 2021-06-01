import {
    Directive,
    HostListener,
    ElementRef,
    Renderer2 
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2){}

  @HostListener('click') toggleOpen() {
    let menu = this.elRef.nativeElement.querySelector('.dropdown-menu');
    menu.classList.contains('show')? this.renderer.removeClass(menu,'show'): this.renderer.addClass(menu, 'show')
  }

}
