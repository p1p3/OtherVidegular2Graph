import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export interface IAnalyticsService {
    getRecordEmotions(recordId: string): Observable<Response>;
    getRecordTimeMarkers(recordId: string): Observable<Response>;
    getRecordTextAnalytics(recordId: string): Observable<Response>;
    getRecordFullText(recordId: string): Observable<Response>;
    getRecordKeyPhrase(recordId: string): Observable<Response>;
    getRecordInsights(recordId: string): Observable<Response>;
}