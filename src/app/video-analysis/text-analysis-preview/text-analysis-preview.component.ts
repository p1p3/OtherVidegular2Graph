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

  constructor( @Inject('ITextAnalyticsService') private textAnayticsService: ITextAnalyticsService) { }

  ngOnInit() {
    this.textAnalyticsObservable = this.textAnayticsService.getRecordTextAnalytics(this.recordId);
    this.textAnalyticsObservable.subscribe(analytics => {
      this.textAnalytics = analytics;
    });
  }

}
