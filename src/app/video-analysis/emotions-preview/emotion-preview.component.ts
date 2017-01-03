import { colors } from './../shared/models/colors.model';
import { BaseChartDirective } from './../../charts/chartJs/chartsJs';
import { ChartJsNames } from './../../charts/chartJs/chart-js-names.constants';
import { Sentiment } from './../shared/models/sentiment.model';
import { GraphType } from '../shared/enums/graph-type.enum';
import { TimeMarker } from '../shared/models/time-marker.model';
import { Emotion } from '../shared/models/emotion.model';
import { EmotionChartData } from '../shared/models/emotion-chart-data.model';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-emotion-preview',
  templateUrl: './emotion-preview.component.html',
  styleUrls: ['./emotion-preview.component.css']
})
export class EmotionPreviewComponent implements OnInit {
  @Input() markers: Observable<TimeMarker>;
  public graphs = GraphType;
  public chartsNames = ChartJsNames;

  public selectedGraph: GraphType = GraphType.bars;
  public chartLabels = EmotionChartData.chartLabels;

  public radarChartData = new Array<EmotionChartData>();
  public doughnutChartData: Array<number>;
  public barChartData = new Array<EmotionChartData>();

  public chartLegend: boolean = false;
  public chartOptions: ChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    animation: false,
    maintainAspectRatio: false
  };

  private chartColors: Array<any> = [
    {
      backgroundColor: colors.bluedan,
      borderColor: colors.bluedandark,
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  constructor() {
  }

  ngOnInit() {
    this.markers.subscribe(timeMarker => this.displayData(timeMarker));
  }

  displayData(timeMarker: TimeMarker) {
    let emotionChartData = new EmotionChartData(timeMarker, 'Emotions');
    this.fillChartsData(emotionChartData);
  }

  fillChartsData(emotionChartdata: EmotionChartData) {
    this.radarChartData = [emotionChartdata];
    this.barChartData = [emotionChartdata];
    this.doughnutChartData = emotionChartdata.data;
  }

  selectEmotionGraph(graphType: GraphType) {
    this.selectedGraph = graphType;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}


