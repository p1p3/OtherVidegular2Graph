import { TickMarker } from './tick-marker.model';
import { Emotion } from './../emotion.model';

export class TickMarkerData extends TickMarker {
    constructor(public emotion: Emotion,
        public startTick: number,
        public endTick: number,
        public timeScale: number) {
        super(startTick, endTick, timeScale);
    }


}
