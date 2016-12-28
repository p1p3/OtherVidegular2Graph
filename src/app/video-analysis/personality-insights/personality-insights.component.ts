import { ChartBarWithLineOptions, LineAt } from './../../charts/chartJs/BarWithLine.chartjs';
import { Component, OnInit } from '@angular/core';
import { ChartJsNames } from './../../charts/chartJs/chart-js-names.constants';

@Component({
  selector: 'app-personality-insights',
  templateUrl: './personality-insights.component.html',
  styleUrls: ['./personality-insights.component.css']
})
export class PersonalityInsightsComponent implements OnInit {

  private insightTypes = InsightType;
  private selectedInsightType = InsightType.Personality;

  public chartName = ChartJsNames.bar;
  public chartOptions: ChartBarWithLineOptions = {
    lineAt: { value: 95, color: 'green', label:'Emotional Range' },
    scaleShowVerticalLines: false,
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

  
  public barChartLabels: string[] = ['Melancholy', 'Impulsiveness', 'Self-consciousness', 
                                     'Susceptible to stress', 'Fiery', 'Prone to worry'];
   public barChartLegend: boolean = false;

  public barChartData: any[] = [
    { data: [17, 13, 7, 2, 1, 1] },
  ];


  constructor() { }

  ngOnInit() {
  }

  selectInsight(insightType: InsightType) {
    this.selectedInsightType = insightType;
  }


}


export enum InsightType {
  Personality,
  ConsumerNeeds,
  Values
}
