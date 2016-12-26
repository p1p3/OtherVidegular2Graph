import { TimeMarker } from './../../models/time-marker.model';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export interface IEmotionService{
    getRecordEmotions(recordId:string):Observable<TimeMarker[]>;
}