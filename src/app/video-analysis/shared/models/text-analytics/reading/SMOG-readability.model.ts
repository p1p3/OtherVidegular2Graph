import { ReadabilityTest } from './readability-test.model';
import { USAGradeLevels } from './united-states-grades.model';
import { IndexScore } from './index-score-model';

export class SMOGReadability implements ReadabilityTest {
    public scores: Array<IndexScore>;
    public intro = 'SMOG is the acronym derived from Simple Measure of Gobbledygook. It is widely used, particularly for checking health messages.';
    public meaning = 'The SMOG grade is a measure of readability that estimates the years of education needed to understand a piece of writing.';
    constructor() {
        this.scores = new USAGradeLevels().IndexsScores;

    }
}
