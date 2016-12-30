import { Component, OnInit } from '@angular/core';
import { GaugeSegment, GaugeLabel } from 'ng2-kw-gauge';

@Component({
  selector: 'app-reading-ease-preview',
  templateUrl: './reading-ease-preview.component.html',
  styleUrls: ['./reading-ease-preview.component.css']
})
export class ReadingEasePreviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  colors = {
    indigo: '#14143e',
    pink: '#fd1c49',
    orange: '#ff6e00',
    yellow: '#f0c800',
    mint: '#00efab',
    cyan: '#05d1ff',
    purple: '#841386',
    white: '#fff'
  };

  progressGraph = {
    bgRadius: 60,
    bgColor: this.colors.indigo,
    rounded: false,
    reverse: false,
    animationSecs: 1,
    labels: [
      new GaugeLabel({
        color: this.colors.white,
        text: 'Reading Ease',
        x: 0,
        y: 20,
        fontSize: '1em'
      }),
      new GaugeLabel({
        color: this.colors.pink,
        text: '81%',
        x: 0,
        y: 0,
        fontSize: '2em'
      })
    ],
    segments: [
      new GaugeSegment({
        value: 81,
        color: this.colors.pink,
        borderWidth: 20
      })
    ]
  };
}
