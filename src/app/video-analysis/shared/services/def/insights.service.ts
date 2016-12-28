import { Insight } from './../../models/Insights/insight.model';
import { Observable } from 'rxjs/Rx';

export interface IInsightService {
    getRecordInsights(recordId: string): Observable<Insight>;
}
