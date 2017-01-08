import { ReadabilityTest } from './readability-test.model';
import { USAGradeLevels } from './united-states-grades.model';
import { IndexScore } from './index-score-model';
import { IndexBasedTest } from './index-based-test.model';

export class SpacheReadability extends IndexBasedTest implements ReadabilityTest {
    public intro = 'The Spache readability formula is a readability test for writing in English, designed by George Spache. It works best on texts that are for children up to fourth grade. For older children, the Dale–Chall readability formula is more appropriate.';
    public meaning = 'The Spache readability formula is a readability test for writing in English, designed by George Spache. It works best on texts that are for children up to fourth grade. For older children, the Dale–Chall readability formula is more appropriate.';
    public lessIsBetter: boolean = true;

    constructor() {
        super(new USAGradeLevels(1, USAGradeLevels.FourthGrade).IndexsScores);
    }
}


