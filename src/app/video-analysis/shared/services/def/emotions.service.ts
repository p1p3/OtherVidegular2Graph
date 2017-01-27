import { FullEmotion } from './../../models/full-emotions/full-emotion.model';
import { TimeMarker } from './../../models/time-marker.model';
import { Observable } from 'rxjs/Rx';

export interface IEmotionService {
    getRecordEmotions(recordId: string): Observable<TimeMarker[]>;
    getFullRecordEmotions(recordId: string): Observable<FullEmotion>;
}

