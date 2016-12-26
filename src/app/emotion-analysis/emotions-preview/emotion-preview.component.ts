import { LinearGaugeOptions } from './../../charts/linear-gauge/shared/linear-gauge-options.model';
import { IEmotionService } from './../shared/services/def/emotions.service';
import { VgAPI } from 'videogular2/core';
import { TimeMarker } from '../shared/models/time-marker.model';
import { Emotion } from '../shared/models/emotion.model';
import { EmotionChartData } from '../shared/models/emotion-chart-data.model';
import { Component, OnInit, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-emotion-preview',
  templateUrl: './emotion-preview.component.html',
  styleUrls: ['./emotion-preview.component.css']
})
export class EmotionPreviewComponent implements OnInit {
  sources: Array<Object>;
  api: VgAPI;

  private recordID = 'z4eee59e-f1ae-4882-9bbe-ee0c409c5ded';

  public graphs = GraphType;
  public selectedGraph: GraphType = GraphType.radar;
  public currentEmotion: EmotionChartData;

  public radarChartType: string = 'radar';
  public doughnutChartType: string = 'doughnut';
  public barChartType: string = 'bar';
  public lineChartType: string = 'line';
  public linearGaugeType: string = 'Linear';

  public radarChartLabels: Array<string> = EmotionChartData.chartLabels;
  public doughnutChartLabels: Array<string> = EmotionChartData.chartLabels;
  public barChartLabels: Array<string> = EmotionChartData.chartLabels;
  public lineChartLabels: Array<string> = EmotionChartData.chartLabels;

  public radarChartData = new Array<EmotionChartData>();
  public doughnutChartData: Array<number>;
  public barChartData = new Array<EmotionChartData>();

  public emotionsSource: Observable<EmotionChartData>;
  public emotionDataSource = new Array<EmotionChartData>();

  public chartLegend: boolean = false;
  public chartOptions: ChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    animation: false,
    maintainAspectRatio: false
  };


  // lineChart
  public lineChartData: Array<number[]> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

  public linearGaugeSource: Observable<number>;
  public linearGaugeOptions: LinearGaugeOptions;
  public sentimentSource = new Subject<number>();

  constructor( @Inject('IEmotionService') private emotionService: IEmotionService,
    api: VgAPI) {

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
    this.initGraphsWithEmptyData();
    this.initLinearGauge();
    this.initGraphdata();
    this.emotionDataSource.sort((a, b) => a.timeMarker.startTime - b.timeMarker.startTime)
  }

  private initGraphsWithEmptyData() {
    let emptyEmotion = new Emotion(0, 0, 0, 0, 0, 0, 0, 0);
    let timeMarker = new TimeMarker('abc', 0, 0, emptyEmotion);
    let emotionDataChart = new EmotionChartData(timeMarker, 'Emotions');
    this.fillChartsData(emotionDataChart);
  }

  private initGraphdata() {
    this.emotionService.getRecordEmotions(this.recordID).subscribe(timeMarkers => {
      timeMarkers.forEach(timeMarker => {
        let emotionChartData = new EmotionChartData(timeMarker, 'Emotions');
        this.emotionDataSource.push(emotionChartData);
      });
    });
  }

  private initLinearGauge() {
    this.linearGaugeOptions = new LinearGaugeOptions(0, 100, 0);
    this.linearGaugeOptions.addRange(0, 49, 'red');
    this.linearGaugeOptions.addRange(50, 100, 'green');
    this.linearGaugeSource = this.sentimentSource.asObservable();
  }

  private createMockData(startSecond: number, endSecond: number) {
    let emotionMock = new Emotion(Math.random(), Math.random(), Math.random(), Math.random(),
      Math.random(), Math.random(), Math.random(), Math.random());
    let timeMarker = new TimeMarker('abc', startSecond, endSecond, emotionMock);
    let emotionDataChart = new EmotionChartData(timeMarker, 'Emotions');
    return emotionDataChart;
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
      let dataForCurrentTime = this.emotionDataSource.find(data => this.isCurrentTimeInTimeMarkerInRange(currentTime, data.timeMarker));


      if (dataForCurrentTime && (this.isNotBeingDisplayed(dataForCurrentTime) || (!this.isNotNull(this.currentEmotion)))) {
        this.fillChartsData(dataForCurrentTime);
      }
    });
  }

  fillChartsData(emotionChartdata: EmotionChartData) {
    this.currentEmotion = emotionChartdata;
    this.radarChartData = [emotionChartdata];
    this.barChartData = [emotionChartdata];
    this.doughnutChartData = emotionChartdata.data;
    this.sentimentSource.next(Math.random() * 100);
  }


  isCurrentTimeInTimeMarkerInRange(currentTime: number, timeMarker: TimeMarker): boolean {
    return (currentTime >= timeMarker.startTime && currentTime <= timeMarker.endTime);
  }

  isNotNull(obj: any): boolean {
    return obj;
  }

  isNotBeingDisplayed(emotionChartData: EmotionChartData): boolean {
    return this.currentEmotion !== emotionChartData;
  }

  selectEmotionGraph(graphType: GraphType) {
    this.selectedGraph = graphType;
  }

}


export enum GraphType {
  doughnut = 0,
  radar,
  bars
}


