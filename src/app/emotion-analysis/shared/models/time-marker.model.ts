import { Emotion } from './emotion.model';

export class TimeMarker {
    constructor(public markerId: string,
    public startTime: number,
    public endTime: number,
    public emotion:Emotion){}
}