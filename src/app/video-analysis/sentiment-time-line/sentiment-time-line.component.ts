import { Sentiment } from './../shared/models/sentiment.model';
import { Emotion } from './../shared/models/emotion.model';
import { EmotionTimelineChartData } from './../shared/models/emotion-timeline-chart-data.model';
import { TimeMarker } from './../shared/models/time-marker.model';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sentiment-time-line',
  templateUrl: './sentiment-time-line.component.html',
  styleUrls: ['./sentiment-time-line.component.css']
})
export class SentimentTimeLineComponent implements OnInit {
  @Input() markers: Observable<TimeMarker[]>;
  private showUpperLabels: boolean = true;
  private lineChartData = Array<any>();
  private lineChartLabels: Array<string>;
  private lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  private lineChartType: string = 'line';

  constructor() { }


  ngOnInit() {
    this.initGraphsWithEmptyData();
    this.markers.subscribe(timeMarkers => {
      //TODO: FIX ALGORITHM
      let chartData = new EmotionTimelineChartData(timeMarkers);
      this.fillChartsData(chartData);
    });
  }

  private initGraphsWithEmptyData() {
    let emptyEmotion = new Emotion(0, 0, 0, 0, 0, 0, 0, 0);
    let emptySentiment = new Sentiment(0);
    let timeMarker = new TimeMarker('', 0, 0, emptyEmotion, emptySentiment);
    let emotionDataChart = new EmotionTimelineChartData([timeMarker]);
    this.fillChartsData(emotionDataChart);
  }

  fillChartsData(emotionChartdata: EmotionTimelineChartData) {
    this.lineChartData = emotionChartdata.data;
    this.lineChartLabels = emotionChartdata.markersLabels;
  }

}
