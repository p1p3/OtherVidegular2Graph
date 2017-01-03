import { colors } from './../shared/models/colors.model';
import { ChildTrait } from './../shared/models/Insights/child-trait.model';
import { IInsightService } from './../shared/services/def/insights.service';
import { TraitChartData } from './../shared/models/Insights/charts/trait-chart-data.model';
import { RootTrait } from './../shared/models/Insights/root-trait.model';
import { Insight } from './../shared/models/Insights/insight.model';
import { ChartBarWithLineOptions, LineAt } from './../../charts/chartJs/BarWithLine.chartjs';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { ChartJsNames } from './../../charts/chartJs/chart-js-names.constants';

@Component({
  selector: 'app-personality-insights',
  templateUrl: './personality-insights.component.html',
  styleUrls: ['./personality-insights.component.css']
})
export class PersonalityInsightsComponent implements OnInit {
  @Input() record: string;
  private insight: Insight;
  private insightTypes = InsightType;
  private selectedInsightType = InsightType.Personality;
  private showGraph: boolean = true;

  public chartName = ChartJsNames.bar;

  public baseOptions: ChartBarWithLineOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          max: 100,
          min: 0,
          stepSize: 20
        }
      }]
    }
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

  public barChartPersonalityLabels: string[];
  public barChartValuesLabels: string[];
  public barChartNeedsLabels: string[];

  public selectedRootTrait: RootTrait;
  public rootLabels = Array<RootTrait>();

  public barChartOptions: ChartBarWithLineOptions;
  public barChartLabels: string[];
  public barChartLegend: boolean = false;
  public barChartData: TraitChartData[];

  constructor( @Inject('IInsightService') private insightService: IInsightService) {
    this.mergeOptions({});
  }

  ngOnInit() {
    this.fetchRecordInsights(this.record);
  }


  private fetchRecordInsights(recordId: string) {
    this.insightService.getRecordInsights(recordId).subscribe(insight => {
      this.insight = insight;
      this.selectInsight(this.insightTypes.Personality);
    });
  }


  selectInsight(insightType: InsightType) {
    this.selectedInsightType = insightType;
    switch (insightType) {
      case this.insightTypes.ConsumerNeeds:
        this.displayRootTrait(this.insight.needs);
        this.rootLabels = Array<RootTrait>();
        break;
      case this.insightTypes.Values:
        this.displayRootTrait(this.insight.values);
        this.rootLabels = Array<RootTrait>();
        break;
      case this.insightTypes.Personality:
        this.displayFirstRootTrait(this.insight.personality);
        this.rootLabels = this.insight.personality;
        break;
    }
  }

  displayRootTrait(trait: RootTrait) {
    this.selectedRootTrait = trait;
    let data = trait.getChartData();
    let labels = data.chartLabels;
    let options = data.getChartBarWithLineOptions();

    this.mergeOptions(options);
    this.barChartData = [data];
    this.barChartLabels = labels;
    //TODO:REMOVE THIS with other library, it is not removing old canvas so line is there for other graphs
    this.showGraph = false;
    setTimeout(() => this.showGraph = true, 50);
  }

  displayFirstRootTrait(roots: Array<RootTrait>) {
    this.displayRootTrait(roots[0]);
  }

  selectRootTrait(traitId: string) {
    let rootTraitSelected = this.insight.getPersonalityRootTraitById(traitId);
    this.displayRootTrait(rootTraitSelected);
  }

  mergeOptions(options: ChartBarWithLineOptions) {
    this.barChartOptions = {};
    Object.assign(this.barChartOptions, options, this.baseOptions);
  }

}


export enum InsightType {
  Personality,
  ConsumerNeeds,
  Values
}
