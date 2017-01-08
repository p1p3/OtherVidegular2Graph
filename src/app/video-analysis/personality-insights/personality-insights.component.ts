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
  @Input() recordId: string;
  private insight: Insight;
  private insightTypes = InsightType;
  private selectedInsightType = InsightType.Personality;
  private showGraph: boolean = true;

  private chartName = ChartJsNames.bar;

  private baseOptions: ChartBarWithLineOptions = {
 
    responsive: true,
    animation: false,
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
      pointBackgroundColor: 'rgba(75, 192, 192, 0.5);',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  private barChartPersonalityLabels: string[];
  private barChartValuesLabels: string[];
  private barChartNeedsLabels: string[];

  private selectedRootTrait: RootTrait;
  private rootLabels = Array<RootTrait>();

  private barChartOptions: ChartBarWithLineOptions;
  private barChartLabels: string[];
  private big5Labels: string[];

  private barChartLegend: boolean = false;
  private big5ChartLegend: boolean = false;

  private barChartData: TraitChartData[];
  private big5DataSets: TraitChartData[];

  constructor( @Inject('IInsightService') private insightService: IInsightService) {
    this.mergeOptions({});
  }

  ngOnInit() {
    this.fetchRecordInsights(this.recordId);
  }


  private fetchRecordInsights(recordId: string) {
    this.insightService.getRecordInsights(recordId).subscribe(insight => {
      this.insight = insight;
      this.selectInsight(this.insightTypes.ConsumerNeeds);
      this.displayPersonality(this.insight.personality);
    });
  }


  selectInsight(insightType: InsightType) {
    this.selectedInsightType = insightType;
    switch (insightType) {
      case this.insightTypes.ConsumerNeeds:
        this.displayRootTrait(this.insight.needs);
        break;
      case this.insightTypes.Values:
        this.displayRootTrait(this.insight.values);
        break;
    }
  }

  displayRootTrait(trait: RootTrait) {
    this.selectedRootTrait = trait;
    let data = trait.getChartData();
    let labels = data.chartLabels;
    this.barChartData = [data];
    this.barChartLabels = labels;
  }

  displayPersonality(roots: Array<RootTrait>) {
    this.rootLabels = roots;
    let trait = roots[0];
    this.displayTraitInPersonality(trait);
  }

  displayTraitInPersonality(trait: RootTrait) {
    let data = trait.getChartData();
    this.big5DataSets = [data];
    this.big5Labels = data.chartLabels;
    setTimeout(() => {
      let options = data.getChartBarWithLineOptions();
      this.mergeOptions(options);
    }, 20);

  }

  selectRootTrait(traitId: string) {
    let rootTraitSelected = this.insight.getPersonalityRootTraitById(traitId);
    this.displayTraitInPersonality(rootTraitSelected);
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
