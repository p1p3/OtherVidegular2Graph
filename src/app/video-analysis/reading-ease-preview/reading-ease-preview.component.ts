import { colors } from './../shared/models/colors.model';
import { Component, OnInit, Input } from '@angular/core';
import { GaugeSegment, GaugeLabel } from 'ng2-kw-gauge';

@Component({
  selector: 'app-reading-ease-preview',
  templateUrl: './reading-ease-preview.component.html',
  styleUrls: ['./reading-ease-preview.component.css']
})
export class ReadingEasePreviewComponent implements OnInit {
  @Input() readingEasePercentage: number;
  private textToDisplay: string;
  private progressGraph: any;

  constructor() {

  }

  ngOnInit() {
    this.textToDisplay = `${this.readingEasePercentage}%`;

    this.progressGraph = {
      bgRadius: 60,
      bgColor: colors.indigo,
      rounded: false,
      reverse: false,
      animationSecs: 1,
      labels: [
        new GaugeLabel({
          color: colors.white,
          text: 'Reading Ease',
          x: 0,
          y: 20,
          fontSize: '1em'
        }),
        new GaugeLabel({
          color: colors.pink,
          text: this.textToDisplay,
          x: 0,
          y: 0,
          fontSize: '2em'
        })
      ],
      segments: [
        new GaugeSegment({
          value: this.readingEasePercentage,
          color: colors.pink,
          borderWidth: 20
        })
      ]
    };
  }


}
