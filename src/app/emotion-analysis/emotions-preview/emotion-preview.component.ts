import { VgAPI } from 'videogular2/core';
import { element } from 'protractor';
import { TimeMarker } from '../shared/time-marker.model';
import { Emotion } from '../shared/emotion.model';
import { EmotionChartData } from '../shared/emotion-chart-data.model';
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

  public graphs = GraphType;
  public selectedGraph: GraphType = GraphType.radar;
  public currentEmotion: EmotionChartData;

  public radarChartType: string = 'radar';
  public doughnutChartType: string = 'doughnut';
  public barChartType: string = 'bar';
  public lineChartType: string = 'line';

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
    responsive: true
  };


  // lineChart
  public lineChartData: Array<number[]> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];





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
    this.initGraphWithEmptyData();
    this.initMockData();
    this.emotionDataSource.sort((a, b) => a.timeMarker.StartTime - b.timeMarker.StartTime)
  }

  private initGraphWithEmptyData() {
    let emptyEmotion = new Emotion(0, 0, 0, 0, 0, 0, 0, 0);
    let timeMarker = new TimeMarker('abc', 0, 0);
    let emotionDataChart = new EmotionChartData(emptyEmotion, 'Emotions', timeMarker);

    this.fillChartsData(emotionDataChart);
  }

  private initMockData() {
    let tiemSpan = 10;
    for (let _i = 0; _i < 160; _i += tiemSpan) {
      let timeMarker = new TimeMarker('abc', _i, _i + tiemSpan);
      let mockData = this.createMockData(timeMarker);
      this.emotionDataSource.push(mockData);
    }
  }

  private createMockData(timeMarker: TimeMarker) {

    let emotionMock = new Emotion(Math.random(), Math.random(), Math.random(), Math.random(),
      Math.random(), Math.random(), Math.random(), Math.random());
    let emotionDataChart = new EmotionChartData(emotionMock, 'Emotions', timeMarker);
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
  }


  isCurrentTimeInTimeMarkerInRange(currentTime: number, timeMarker: TimeMarker): boolean {
    return (currentTime >= timeMarker.StartTime && currentTime <= timeMarker.EndTime);
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