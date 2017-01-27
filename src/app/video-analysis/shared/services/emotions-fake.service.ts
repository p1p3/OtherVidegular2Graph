import { TickMarkerData } from './../models/full-emotions/tick-marker-data.model';
import { TickMarkerGroup } from './../models/full-emotions/tick-marker-group.model';
import { FullEmotion } from './../models/full-emotions/full-emotion.model';
import { Sentiment } from './../models/sentiment.model';
import { Emotion } from './../models/emotion.model';
import { TimeMarker } from './../models/time-marker.model';
import { IEmotionService } from './def/emotions.service';
import { Injectable } from '@angular/core';
import { Observable, Operator } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';

@Injectable()
export class FakeEmotionService implements IEmotionService {

    constructor(private http: Http) { }
    public getRecordEmotions(recordId: string): Observable<TimeMarker[]> {
        let timeMarkers = new Array<TimeMarker>();
        let tiemSpan = 1;
        for (let _i = 0; _i < 160; _i += tiemSpan) {
            let fakeData = this.createFakeTimeMarkerData(_i, _i + tiemSpan);
            timeMarkers.push(fakeData);
        }

        return Observable.of(timeMarkers);
    }

    public getFullRecordEmotions(recordId: string): Observable<FullEmotion> {
        return this.http.get('assets/mocks/complete-emotions.json')
            .map((res: Response) => this.mapJsonFullEmotiont(res.json()));
    }


    private createFakeTimeMarkerData(startSecond: number, endSecond: number) {
        let fakeEmotion = new Emotion(Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random());
        let fakeSentiment = new Sentiment(Math.random());
        let timeMarker = new TimeMarker('abc', startSecond, endSecond, fakeEmotion, fakeSentiment, 'fake text');
        return timeMarker;
    }

    private mapJsonFullEmotiont(jsonResponse: any): FullEmotion {
        let timeScale: number = jsonResponse.Timescale;
        let groupedMarkers = jsonResponse.TickMarkers.map(element => {
            return this.mapJsonToTickMarkerGroup(element, timeScale);
        });

        let mappedInsight = new FullEmotion(groupedMarkers, timeScale);

        return mappedInsight;
    }

    private mapJsonToTickMarker(jsonResponse: any, timeScale: number): TickMarkerData {
        return new TickMarkerData(jsonResponse.FaceDistribution, jsonResponse.StartTick, jsonResponse.EndTick, timeScale);
    }

    private mapJsonToTickMarkerGroup(jsonResponse: any, timeScale: number): TickMarkerGroup {
        let markers: Array<TickMarkerData> = jsonResponse.FaceDistributions.map(element => {
            return this.mapJsonToTickMarker(element, timeScale);
        });
        return new TickMarkerGroup(markers, jsonResponse.StartTick, jsonResponse.EndTick, timeScale);
    }
}