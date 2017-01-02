import { Response } from '@angular/http';
import { IAnalyticsService } from './../../../core/services/def/analytics.service';
import { TextAnalytics } from './../models/text-analytics/text-analytics.model';
import { Observable } from 'rxjs/Rx';
import { ITextAnalyticsService } from './def/text-analytics.service';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class TextAnalyticsService implements ITextAnalyticsService {

    constructor( @Inject('IAnalyticsService') private analyticsService: IAnalyticsService) { }

    getRecordTextAnalytics(recordId: string): Observable<TextAnalytics> {
        return this.analyticsService
            .getRecordEmotions(recordId)
            .map(response => this.mapResponseToTextAnalytics(response));
    }

    private mapResponseToTextAnalytics(response: Response): TextAnalytics {
        debugger;
        let textAnalytics: any;

        return textAnalytics;
    }

}
