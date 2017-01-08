import { ReadabilityTest } from './readability-test.model';
import { USAGradeLevels } from './united-states-grades.model';
import { IndexScore } from './index-score-model';
import { IndexBasedTest } from './index-based-test.model';

export class SMOGReadability extends IndexBasedTest implements ReadabilityTest {
    public intro = 'SMOG is the acronym derived from Simple Measure of Gobbledygook. It is widely used, particularly for checking health messages.';
    public meaning = 'The SMOG grade is a measure of readability that estimates the years of education needed to understand a piece of writing.';
    public lessIsBetter: boolean = true;
    constructor() {
        super(new USAGradeLevels().IndexsScores);
    }
}



