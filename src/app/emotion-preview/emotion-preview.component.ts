import { element } from 'protractor';
import { TimeMarker } from './shared/time-marker.model';
import { Emotion } from './shared/emotion.model';
import { EmotionChartData } from './shared/emotion-chart-data.model';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-emotion-preview',
  templateUrl: './emotion-preview.component.html',
  styleUrls: ['./emotion-preview.component.css']
})
export class EmotionPreviewComponent implements OnInit {

  public radarChartType: string = 'radar';
  public radarChartLabels: Array<string> = EmotionChartData.chartLabels;
  public radarChartData = new Array<EmotionChartData>();

  public radarChartDataSource = new Array<EmotionChartData>();
  public emotionsSource: Observable<EmotionChartData>;

  constructor() {

  }

  ngOnInit() {
    let emotionMock = new Emotion(0.00383, 0.01105, 0.0064, 0.00139, 0.05151, 0.81779, 0.0987, 0.00921);
    let timeMarker = new TimeMarker('abc', '00:00:00', '00:10:14');
    let emotionDataChart = new EmotionChartData(emotionMock, 'Emotions', timeMarker);
    this.radarChartData.push(emotionDataChart);

    let emotionMock1 = new Emotion(0.8, 0.1, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0);
    let timeMarker1 = new TimeMarker('abc', '00:10:14', '00:20:14');
    let emotionDataChart1 = new EmotionChartData(emotionMock1, 'Emotions', timeMarker1);
    this.radarChartDataSource.push(emotionDataChart1);


    let emotionMock2 = new Emotion(0.0, 0.0, 0.3, 0.3, 0.3, 0.1, 0.0, 0.0);
    let timeMarker2 = new TimeMarker('abc', '00:30:14', '00:40:14');
    let emotionDataChart2 = new EmotionChartData(emotionMock2, 'Emotions', timeMarker2);
    this.radarChartDataSource.push(emotionDataChart2);

    Observable
      .interval(2000)
      .take(this.radarChartDataSource.length) // end the observable after it pulses N times
      .map(index => this.radarChartDataSource[index])
      .subscribe(element => {
        this.radarChartData = [element];
      });
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }




}
