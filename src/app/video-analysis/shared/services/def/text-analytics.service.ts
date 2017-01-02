import { TextAnalytics } from './../../models/text-analytics/text-analytics.model';
import { Observable } from 'rxjs/Rx';

export interface ITextAnalyticsService {
    getRecordTextAnalytics(recordId: string): Observable<TextAnalytics>;
}
