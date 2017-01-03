import { ChartColors } from './../shared/models/colors.model';
import { EmotionTimelineChartData } from './../shared/models/emotion-timeline-chart-data.model';
import { Sentiment } from './../shared/models/sentiment.model';
import { Emotion } from './../shared/models/emotion.model';
import { TimeMarker } from './../shared/models/time-marker.model';
import { Observable } from 'rxjs/Rx';
import { EmotionChartData } from './../shared/models/emotion-chart-data.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-emotion-time-line',
  templateUrl: './emotion-time-line.component.html',
  styleUrls: ['./emotion-time-line.component.css']
})
export class EmotionTimeLineComponent implements OnInit {
  @Input() markers: Observable<TimeMarker[]>;
  private showUpperLabels: boolean = true;
  private lineChartData = Array<any>();
  private lineChartLabels = Array<string>();
  private lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  private lineChartType: string = 'line';
  private chartColors: Array<any> = ChartColors;
  constructor() { }


  ngOnInit() {
    this.markers.subscribe(timeMarkers => {
      //TODO: FIX ALGORITHM
      let chartData = new EmotionTimelineChartData(timeMarkers);
      this.fillChartsData(chartData);
    });
  }

  fillChartsData(emotionChartdata: EmotionTimelineChartData) {
    this.lineChartData = emotionChartdata.data;
    this.lineChartLabels = emotionChartdata.markersLabels;
  }


}
