import { colors } from './../shared/models/colors.model';
import { ChartJsNames } from './../../charts/chartJs/chart-js-names.constants';
import { ITextAnalyticsService } from './../shared/services/def/text-analytics.service';
import { TextAnalytics } from './../shared/models/text-analytics/text-analytics.model';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'app-text-analysis-preview',
  templateUrl: './text-analysis-preview.component.html',
  styleUrls: ['./text-analysis-preview.component.css']
})
export class TextAnalysisPreviewComponent implements OnInit {
  @Input() recordId: string;
  private textAnalyticsObservable: Observable<TextAnalytics>;
  private textAnalytics: TextAnalytics;

  // tslint:disable-next-line:no-unused-variable
  private tabs = Tabs;
  private selectedTab: Tabs = Tabs.Favorites;


  // charts Variables
  private chartsNames = ChartJsNames;

  private chartOptions: ChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    animation: false,
    maintainAspectRatio: false
  };

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

 /* private percentagesChartData = new Array<TextPercentagesChartData>();
  private percentagesChartLabels = TextPercentagesChartData.chartLabels;
  private percentagesChartLegend: boolean = false;
  private percentagesChartType = ChartJsNames.bar;
  private percentagesChartColors = this.chartColors;

  private indexesChartData = new Array<TextIndexesChartData>();
  private indexesChartDataLabels = TextIndexesChartData.chartLabels;
  private indexesChartLegend: boolean = false;
  private indexesChartType = ChartJsNames.bar;
  private indexesChartColors = this.chartColors;*/

  constructor( @Inject('ITextAnalyticsService') private textAnayticsService: ITextAnalyticsService) { }

  ngOnInit() {
    this.textAnalyticsObservable = this.textAnayticsService.getRecordTextAnalytics(this.recordId);
    this.textAnalyticsObservable.subscribe(analytics => {
      this.textAnalytics = analytics;
    });
  }

  // tslint:disable-next-line:no-unused-variable
  private selectTab(tab: Tabs) {
    this.selectedTab = tab;
  }


}

enum Tabs {
  Favorites,
  Percentages,
  Indexes
}
