import { IndexScore } from './index-score-model';

export abstract class IndexBasedTest {
    public readonly maxScore: number;
    constructor(public readonly scores: Array<IndexScore>) {
        let possibleScores = this.scores.map(indexScore => indexScore.index);
        this.maxScore = Math.max(...possibleScores);
    }

}