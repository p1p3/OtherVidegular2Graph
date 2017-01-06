import { ReadabilityTest } from './readability-test.model';
import { USAGradeLevels } from './united-states-grades.model';
import { IndexScore } from './index-score-model';

export class AutomatedReadability implements ReadabilityTest {
    public scores: Array<IndexScore>;
    public grades: USAGradeLevels;
    public intro = 'The automated readability index (ARI) is a readability test for English texts, designed to gauge the understandability of a text.';
    public meaning = 'The automated readability index (ARI) output approximates the U.S. grade level thought necessary to comprehend the text.';
    constructor() {
        let bias = 1;
        this.grades = new USAGradeLevels(bias);
        this.scores = this.grades.IndexsScores;
    }
}
