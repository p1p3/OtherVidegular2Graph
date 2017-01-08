import { ReadabilityTest } from './readability-test.model';
import { USAGradeLevels } from './united-states-grades.model';
import { IndexScore } from './index-score-model';
import { IndexBasedTest } from './index-based-test.model';

export class GunningFogReadability extends IndexBasedTest implements ReadabilityTest {
    public meaning = 'The Gunning fog index measures the readability of English writing. The index estimates the years of formal education needed to understand the text on a first reading.';
    public intro = 'The fog index is commonly used to confirm that text can be read easily by the intended audience. Texts for a wide audience generally need a fog index less than 12. Texts requiring near-universal understanding generally need an index less than 8..';
    public lessIsBetter: boolean = true;

    constructor() {
        super(new USAGradeLevels().IndexsScores);
    }
}
