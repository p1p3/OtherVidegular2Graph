
import { ReadAbilityScore } from './readability-score.model';
export class RangeScore extends ReadAbilityScore {
    constructor(public scoreBottom: number,
        public scoreTop: number,
        public schoolLevel: string,
        public notes?: string) {
        super(`${scoreBottom} - ${scoreTop}`, schoolLevel, notes);
    }
}

