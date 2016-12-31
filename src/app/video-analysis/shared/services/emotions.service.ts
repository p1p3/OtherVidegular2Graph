import { Sentiment } from './../models/sentiment.model';
import { Emotion } from './../models/emotion.model';
import { TimeMarker } from './../models/time-marker.model';
import { Injectable, Inject } from '@angular/core';
import { Observable, Operator } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { Http, Response, Headers } from '@angular/http'

import { IAnalyticsService } from './../../../core/services/def/analytics.service';
import { IEmotionService } from './def/emotions.service';

@Injectable()
export class EmotionService implements IEmotionService {

    constructor( @Inject('IAnalyticsService') private analyticsService: IAnalyticsService) { }

    public getRecordEmotions(recordId: string): Observable<TimeMarker[]> {
        return this.analyticsService
            .getRecordEmotions(recordId)
            .map(response => this.mapResponseToMarkers(response));
    }

    private mapResponseToMarkers(response: Response) {
        let serverTimeMarkers = response.json().TimeMarkers as Array<any>;
        let timeMarkers: Array<TimeMarker>;
        timeMarkers = serverTimeMarkers.map(serverMarker => {
            let id = serverMarker.MarkerID;
            let timeInfo = serverMarker.TimeInfoData;

            let times: Array<string> = timeInfo.StartTime.split('-->');
            let startTime: number;
            let endTime: number;

            if (times.length > 1) {
                startTime = this.getTotalSecondsFromDateTime(this.getDateFromTimeInfo(times[0]));
                endTime = this.getTotalSecondsFromDateTime(this.getDateFromTimeInfo(times[1]));
            } else {
                startTime = this.getTotalSecondsFromDateTime(this.getDateFromTimeInfo(timeInfo.StartTime));
                endTime = this.getTotalSecondsFromDateTime(this.getDateFromTimeInfo(timeInfo.EndTime));
            }

            let emotion: Emotion = this.getEmotionFromJSON(timeInfo.Emotion);
            let sentiment: Sentiment = this.getSentimentFromJSON(timeInfo.TimeTextSentiment);

            return new TimeMarker(id, startTime, endTime, emotion, sentiment);
        });


        return timeMarkers;
    }

    private getDateFromTimeInfo(time: string): Date {
        let dateFormat = 'January 1, 1970, {time}';
        return new Date(dateFormat.replace('{time}', time));
    }

    private getTotalSecondsFromDateTime(time: Date) {
        let seconds = time.getSeconds();
        let secondsFromMinutes = time.getMinutes() * 60;
        let secondsFromHours = time.getHours() * 3600;
        return seconds + secondsFromMinutes + secondsFromHours;
    }

    private getSentimentFromJSON(jsonSentiment: any): Sentiment {
        let score = JSON.parse(jsonSentiment).documents[0].score;
        return new Sentiment(score);
    }

    private getEmotionFromJSON(jsonEmotion: any): Emotion {
        return JSON.parse(jsonEmotion) as Emotion;
    }
}