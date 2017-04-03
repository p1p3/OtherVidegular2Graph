import { TickMarkerGroup } from './../models/full-emotions/tick-marker-group.model';
import { TickMarkerData } from './../models/full-emotions/tick-marker-data.model';

import { Sentiment } from './../models/sentiment.model';
import { Emotion } from './../models/emotion.model';
import { TimeMarker } from './../models/time-marker.model';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';

import { IAnalyticsService } from './../../../core/services/def/analytics.service';
import { IEmotionService } from './def/emotions.service';
import { FullEmotion } from './../models/full-emotions/full-emotion.model';
@Injectable()
export class EmotionService implements IEmotionService {

    constructor( @Inject('IAnalyticsService') private analyticsService: IAnalyticsService) { }

    public getRecordEmotions(recordId: string): Observable<TimeMarker[]> {
        return this.analyticsService
            .getRecordTimeMarkers(recordId)
            .map(response => this.mapResponseToMarkers(response));
    }

    public getFullRecordEmotions(recordId: string): Observable<FullEmotion> {
        return this.analyticsService.getRecordRawEmotions(recordId)
            .map((res: Response) => this.mapJsonFullEmotiont(res.json()));
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
            let text = timeInfo.TimeText;
            return new TimeMarker(id, startTime, endTime, emotion, sentiment, text);
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

    private mapJsonFullEmotiont(jsonResponse: any): FullEmotion {
        let jsonRawEmotions = JSON.parse(jsonResponse.RawEmotionData);

        let timeScale: number = jsonRawEmotions.Timescale;
        let groupedMarkers = jsonRawEmotions.TickMarkers.map(element => {
            return this.mapJsonToTickMarkerGroup(element, timeScale);
        });

        let mappedInsight = new FullEmotion(groupedMarkers, timeScale);

        return mappedInsight;
    }



    private mapJsonToTickMarkerGroup(jsonResponse: any, timeScale: number): TickMarkerGroup {
        let markers: Array<TickMarkerData> = jsonResponse.FaceDistributions.map(element => {
            return this.mapJsonToTickMarker(element, timeScale);
        });
        return new TickMarkerGroup(markers, jsonResponse.StartTick, jsonResponse.EndTick, timeScale);
    }

    private mapJsonToTickMarker(jsonResponse: any, timeScale: number): TickMarkerData {
        return new TickMarkerData(jsonResponse.FaceDistribution, jsonResponse.StartTick, jsonResponse.EndTick, timeScale);
    }
}
