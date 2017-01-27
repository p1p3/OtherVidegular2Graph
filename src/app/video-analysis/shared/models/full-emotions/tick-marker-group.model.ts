import { TickMarkerData } from './tick-marker-data.model';
import { TickMarker } from './tick-marker.model';

export class TickMarkerGroup extends TickMarker {
    constructor(public faceDistributions: TickMarkerData[],
        public startTick: number,
        public endTick: number,
        public timeScale: number) {
        super(startTick, endTick, timeScale);
    }
}

