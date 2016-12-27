import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personality-insights',
  templateUrl: './personality-insights.component.html',
  styleUrls: ['./personality-insights.component.css']
})
export class PersonalityInsightsComponent implements OnInit {

  private insightTypes = InsightType;
  private selectedInsightType = InsightType.Personality;

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
