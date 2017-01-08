import { RangeScore } from './range-score.model';

export abstract class RangeBasedTest {
    public readonly maxScore: number;
    constructor(public readonly scores: Array<RangeScore>) {
        let possibleScores = this.scores.map(indexScore => indexScore.scoreTop);
        this.maxScore = Math.max(...possibleScores);
    }
}