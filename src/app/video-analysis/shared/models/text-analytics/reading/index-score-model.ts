import { ReadAbilityScore } from './readability-score.model';
export class IndexScore extends ReadAbilityScore {
    constructor(public index: number,
        public schoolLevel: string,
        public notes?: string) {
        super(index.toString(), schoolLevel, notes);
    }
}