import { ReadabilityTest } from './../shared/models/text-analytics/reading/readability-test.model';
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
  @Input() readabilityTest: ReadabilityTest;
  @Input() goal: number;
  @Input() invert: boolean;

  private textToDisplay: string;
  private progressGraph: any;

  constructor() {

  }

  ngOnInit() {
    this.textToDisplay = `${this.readingEasePercentage}`;
    if (!this.goal || this.goal == 0){
      this.goal = 100;
    }
    this.progressGraph = {
      bgRadius: 60,
      bgColor: colors.indigo,
      rounded: false,
      reverse: false,
      animationSecs: 1,
      labels: [
        new GaugeLabel({
          color: colors.white,
          text: this.textToDisplay,
          x: 0,
          y: 10,
          fontSize: '2em'
        })
      ],
      segments: [
        new GaugeSegment({
          value: this.readingEasePercentage,
          color: colors.pink,
          borderWidth: 20,
          goal: this.goal
        })
      ]
    };
  }


}
