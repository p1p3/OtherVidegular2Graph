import { TimeMarker } from './../models/time-marker.model';
import { Injectable, Inject } from '@angular/core';
import { Observable, Operator } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { Http, Response, Headers } from '@angular/http'

import { IAnalyticsService } from './../../../core/services/def/analytics.service';
import { IEmotionService } from './def/emotions.service';

@Injectable()
export class EmotionService implements IEmotionService {

    constructor(@Inject('IAnalyticsService') private analyticsService: IAnalyticsService) { }

    public getRecordEmotions(recordId:string):Observable<TimeMarker[]>{
        return this.analyticsService
               .getRecordEmotions(recordId)
               .map(response => this.mapResponseToMarkers(response));
    }

    private mapResponseToMarkers(response:Response){
        debugger;
        return response.json().TimeMarkers as TimeMarker[];
    }
}