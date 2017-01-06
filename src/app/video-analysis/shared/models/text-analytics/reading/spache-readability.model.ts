import { ReadabilityTest } from './readability-test.model';
import { USAGradeLevels } from './united-states-grades.model';
import { IndexScore } from './index-score-model';

export class SpacheReadability implements ReadabilityTest{
    public intro = 'The Spache readability formula is a readability test for writing in English, designed by George Spache. It works best on texts that are for children up to fourth grade. For older children, the Dale–Chall readability formula is more appropriate.';
    public meaning = 'The Spache readability formula is a readability test for writing in English, designed by George Spache. It works best on texts that are for children up to fourth grade. For older children, the Dale–Chall readability formula is more appropriate.';
    public scores: Array<IndexScore>;
    public grades: USAGradeLevels;
    constructor() {
        let bias = 1;
        this.grades = new USAGradeLevels(bias, USAGradeLevels.FourthGrade);
        this.scores = this.grades.IndexsScores;
    }
}
