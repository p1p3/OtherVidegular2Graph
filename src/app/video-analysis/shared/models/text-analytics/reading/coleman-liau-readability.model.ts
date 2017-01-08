import { ReadabilityTest } from './readability-test.model';
import { USAGradeLevels } from './united-states-grades.model';
import { IndexScore } from './index-score-model';
import { IndexBasedTest } from './index-based-test.model';

export class ColemanLiauReadability extends IndexBasedTest implements ReadabilityTest {
    public meaning = 'The Coleman Liau output approximates the U.S. grade level thought necessary to comprehend the text.';
    public intro = 'The Coleman-Liau Grade Level readability score score gauges the understandability of a text. The formula uses word length in characters and sentence length in words to determine a score corresponding to the estimated grade level or grade level score.';
    public lessIsBetter: boolean = true;

    constructor() {
        super(new USAGradeLevels().IndexsScores);
    }
}



