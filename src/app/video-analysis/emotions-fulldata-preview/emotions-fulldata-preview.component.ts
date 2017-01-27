import { ChartData } from './../shared/models/chart-data.model';
import { colors, ChartColors } from './../shared/models/colors.model';
import { FullEmotionTimelineChartData } from './../shared/models/full-emotions/full-emotion-timeline-chart-data.model';
import { FullEmotion } from './../shared/models/full-emotions/full-emotion.model';
import { Observable } from 'rxjs/Rx';
import { IEmotionService } from './../shared/services/def/emotions.service';
import { FakeEmotionService } from './../shared/services/emotions-fake.service';
import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-emotions-fulldata-preview',
  templateUrl: './emotions-fulldata-preview.component.html',
  styleUrls: ['./emotions-fulldata-preview.component.css'],
  providers: [{ provide: 'IEmotionService', useClass: FakeEmotionService }]
})
export class EmotionsFulldataPreviewComponent implements OnInit {
  @Input() currentTime: Observable<number>;

  private emotionsData: FullEmotion;
  private chartData: FullEmotionTimelineChartData;
  private showUpperLabels: boolean = true;
  private lineChartData = Array<any>();
  private lineChartLabels: Array<string>;
  private lineChartOptions: any = {
    scaleShowVerticalLines: true,
    maintainAspectRatio: false,
    animation: false,
    responsive: true
  };
  private chartColors: Array<any> = ChartColors;
  private lineChartType: string = 'line';


  constructor( @Inject('IEmotionService') private emotionService: IEmotionService) { }

  ngOnInit() {
    this.emotionService.getFullRecordEmotions('fakeId').subscribe(emotion => {
      this.emotionsData = emotion;
      this.chartData = new FullEmotionTimelineChartData(this.emotionsData, 3);

      this.currentTime.subscribe(t => {
        let dataForCurrentTime = this.chartData.getDataUntil(t, 2);
        let data = dataForCurrentTime.data;
        let labels = dataForCurrentTime.labels;
        this.fillChartsData(data, labels);
      });
    });
  }

  fillChartsData(chartData: Array<ChartData>, labels: string[]) {
    this.lineChartData = chartData;
    this.lineChartLabels = labels;
  }

}
