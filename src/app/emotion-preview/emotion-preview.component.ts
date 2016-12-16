import { VgAPI } from 'videogular2/core';
import { element } from 'protractor';
import { TimeMarker } from './shared/time-marker.model';
import { Emotion } from './shared/emotion.model';
import { EmotionChartData } from './shared/emotion-chart-data.model';
import { Component, OnInit, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-emotion-preview',
  templateUrl: './emotion-preview.component.html',
  styleUrls: ['./emotion-preview.component.css']
})
export class EmotionPreviewComponent implements OnInit {
  sources: Array<Object>;
  api: VgAPI;

  public radarChartType: string = 'radar';
  public radarChartLabels: Array<string> = EmotionChartData.chartLabels;
  public radarChartData = new Array<EmotionChartData>();

  public radarChartDataSource = new Array<EmotionChartData>();
  public emotionsSource: Observable<EmotionChartData>;

  constructor(api: VgAPI) {


    this.sources = [
      {
        src: "http://static.videogular.com/assets/videos/videogular.mp4",
        type: "video/mp4"
      },
      {
        src: "http://static.videogular.com/assets/videos/videogular.ogg",
        type: "video/ogg"
      },
      {
        src: "http://static.videogular.com/assets/videos/videogular.webm",
        type: "video/webm"
      }
    ];
  }

  ngOnInit() {
    let emotionMock = new Emotion(0.00383, 0.01105, 0.0064, 0.00139, 0.05151, 0.81779, 0.0987, 0.00921);
    let timeMarker = new TimeMarker('abc', 0, 10);
    let emotionDataChart = new EmotionChartData(emotionMock, 'Emotions', timeMarker);
    this.radarChartDataSource.push(emotionDataChart);

    let emotionMock1 = new Emotion(0.8, 0.1, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0);
    let timeMarker1 = new TimeMarker('abc', 10, 20);
    let emotionDataChart1 = new EmotionChartData(emotionMock1, 'Emotions', timeMarker1);
    this.radarChartDataSource.push(emotionDataChart1);


    let emotionMock2 = new Emotion(0.0, 0.0, 0.3, 0.3, 0.3, 0.1, 0.0, 0.0);
    let timeMarker2 = new TimeMarker('abc', 20, 30);
    let emotionDataChart2 = new EmotionChartData(emotionMock2, 'Emotions', timeMarker2);
    this.radarChartDataSource.push(emotionDataChart2);

    this.radarChartDataSource.sort((a, b) => a.timeMarker.StartTime - b.timeMarker.StartTime)

    /*Observable
      .interval(2000)
      .take(this.radarChartDataSource.length) // end the observable after it pulses N times
      .map(index => this.radarChartDataSource[index])
      .subscribe(element => {
        this.radarChartData = [element];
      });*/
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(time => {
      let currentTime = this.api.getDefaultMedia().currentTime;
      let data = this.radarChartDataSource.find(data => data.timeMarker.StartTime >= currentTime);

     // debugger;
      if ((data && this.radarChartData.length > 0 && this.radarChartData[0] !== data) ||  (data && this.radarChartData.length === 0)) {
        this.radarChartData = [data];
      }


      console.log();

    });
  }
}
