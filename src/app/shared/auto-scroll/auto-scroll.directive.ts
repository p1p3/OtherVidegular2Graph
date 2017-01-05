import { Directive, Input, Renderer, ElementRef, OnInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoScroll]'
})
export class AutoScrollDirective implements OnInit, OnChanges {
  @Input() scrollTo: string;
  @HostListener('mouseenter') onMouseEnter() {
    this.hovering = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hovering = false;
  }

  private container: any;
  private element: ElementRef;
  private renderer: Renderer;
  private hovering: boolean;

  constructor(element: ElementRef, renderer: Renderer) {
    this.element = element;
    this.renderer = renderer;
  }


  ngOnInit() {
    this.container = this.element.nativeElement;
    this.scrollToElement(this.scrollTo);
  }


  ngOnChanges(changes: SimpleChanges): any {
    if (this.container && changes.hasOwnProperty('scrollTo')) {
      this.scrollToElement(this.scrollTo);
    }
  }

  private scrollToElement(query: string) {
    if (query) {
      let child = this.container.querySelector(query);
      if (child && !this.hovering) {
        let childOffsetFromTop: number = child.offsetTop;
        this.container.scrollTop = childOffsetFromTop - 10;
      }
    }
  }

}
