import { Sentiment } from './sentiment.model';
import { Emotion } from './emotion.model';

export class TimeMarker {
    constructor(public markerId: string,
        public startTime: number,
        public endTime: number,
        public emotion: Emotion,
        public sentiment: Sentiment) { }


    get formatedHmsStartTime() {
        return this.secondsToHms(this.startTime);
    }

    get formatedHmsEndTime() {
        return this.secondsToHms(this.endTime);
    }

    private secondsToHms(d: number) {
        d = Number(d);
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);

        let hDisplay = (h > 0 ? this.formatToNN(h) : '00') + ':';
        let mDisplay = (m > 0 ? this.formatToNN(m) : '00') + ':';
        let sDisplay = (s > 0 ? this.formatToNN(s) : '00');
        return hDisplay + mDisplay + sDisplay;
    }

    private formatToNN(d: number) {
        return d >= 10 ? d : `0${d} `;
    }

}