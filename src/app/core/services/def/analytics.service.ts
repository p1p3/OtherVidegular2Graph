import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export interface IAnalyticsService{
    getRecordEmotions(recordId:string):Observable<Response>
}