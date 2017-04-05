import { TickMarker } from './tick-marker.model';
import { Emotion } from './../emotion.model';

export class TickMarkerData extends TickMarker {
    constructor(public emotion: Emotion,
        public startTick: number,
        public endTick: number,
        public timeScale: number) {
        super(startTick, endTick, timeScale);
    }

    public equals(marker: TickMarkerData): boolean {
        let equal = marker
            && Math.round(marker.startTimeInSeconds) === Math.round(this.startTimeInSeconds)
            && Math.round(marker.endTimeInSeconds) === Math.round(this.endTimeInSeconds);
        return equal;
    }

    public equalStartTime(marker: TickMarkerData): boolean {
        let equal = marker && marker.formatedHmsStartTime === this.formatedHmsStartTime;
        return equal;
    }
}
