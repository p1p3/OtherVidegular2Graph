import { TimeMarker } from './../../models/time-marker.model';
import { Observable } from 'rxjs/Rx';

export interface IEmotionService {
    getRecordEmotions(recordId: string): Observable<TimeMarker[]>;
}

