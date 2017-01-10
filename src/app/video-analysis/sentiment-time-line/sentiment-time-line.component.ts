import { colors } from './../shared/models/colors.model';
import { ChartData } from './../shared/models/chart-data.model';
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
    // scaleShowVerticalLines: false,
    // maintainAspectRatio: false,
    animation: false,
    responsive: true
  };
  private lineChartType: string = 'line';
  private chartColors: Array<any> = [
    {
      backgroundColor: colors.bluedan,
      borderColor: colors.bluedandark,
      pointBackgroundColor: 'rgba(75, 192, 192, 0.5);',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.markers.subscribe(timeMarkers => {
      let labels = timeMarkers.map(marker => marker.formatedHmsStartTime);
      let data = timeMarkers.map(marker => marker.sentiment.Positiveness);
      let chartData = new ChartData(data, 'Positiveness');
      this.fillChartsData(chartData, labels);
    });
  }

  fillChartsData(chartData: ChartData, labels: string[]) {
    this.lineChartData = [chartData];
    this.lineChartLabels = labels;
  }

}
