import { WordWeight } from './shared/word-weight.model';
import { Directive, ElementRef, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'canvas[appWordCloud]',
  exportAs: 'app-Word-Cloud'
})
export class WordCloudDirective implements OnDestroy, OnChanges, OnInit {
  @Input() public data = new Array<WordWeight>();
  private canvas: any;
  private element: ElementRef;
  private maxSize: number = 200;

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit() {
    this.canvas = this.element.nativeElement;
  }

  public ngOnDestroy(): any {

  }

  public ngOnChanges(changes: SimpleChanges): any {
    if (changes.hasOwnProperty('data')) {
      this.draw();
    }
  }

  private draw() {
    if (this.data && this.data.length > 0) {

      let outarray = this.data.map((ww) => [ww.word, ww.count]);

      WordCloud(this.canvas, {
        list: outarray,
        gridSize: 1,
        minSize: 10,
        weightFactor: 10,
        backgroundColor: 'rgba(247, 240, 240, 0)'
      });
    }
  }


}
