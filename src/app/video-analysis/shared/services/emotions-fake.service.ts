import { Sentiment } from './../models/sentiment.model';
import { Emotion } from './../models/emotion.model';
import { TimeMarker } from './../models/time-marker.model';
import { IEmotionService } from './def/emotions.service';
import { Injectable } from '@angular/core';
import { Observable, Operator } from 'rxjs/Rx';

@Injectable()
export class FakeEmotionService implements IEmotionService {


    constructor() { }
    public getRecordEmotions(recordId: string): Observable<TimeMarker[]> {
        let timeMarkers = new Array<TimeMarker>();
        let tiemSpan = 1;
        for (let _i = 0; _i < 160; _i += tiemSpan) {
            let fakeData = this.createFakeTimeMarkerData(_i, _i + tiemSpan);
            timeMarkers.push(fakeData);
        }

        return Observable.of(timeMarkers);
    }


    private createFakeTimeMarkerData(startSecond: number, endSecond: number) {
        let fakeEmotion = new Emotion(Math.random(), Math.random(), Math.random(), Math.random(),
            Math.random(), Math.random(), Math.random(), Math.random());
        let fakeSentiment = new Sentiment(Math.random());
        let timeMarker = new TimeMarker('abc', startSecond, endSecond, fakeEmotion, fakeSentiment);
        return timeMarker;
    }
}