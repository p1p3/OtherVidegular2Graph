import { ReadabilityTest } from './readability-test.model';
import { USAGradeLevels } from './united-states-grades.model';
import { IndexScore } from './index-score-model';
import { IndexBasedTest } from './index-based-test.model';

export class AutomatedReadability extends IndexBasedTest implements ReadabilityTest {
    public intro = 'The automated readability index (ARI) is a readability test for English texts, designed to gauge the understandability of a text.';
    public meaning = 'The automated readability index (ARI) output approximates the U.S. grade level thought necessary to comprehend the text.';
    public lessIsBetter: boolean = true;

    constructor() {
        super(new USAGradeLevels(1).IndexsScores);
    }
}


