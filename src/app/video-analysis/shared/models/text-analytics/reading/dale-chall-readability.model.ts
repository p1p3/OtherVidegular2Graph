import { ReadabilityTest } from './readability-test.model';
import { RangeScore } from './range-score.model';
import { USAGradeLevels } from './united-states-grades.model';

export class DaleChallReadability  implements ReadabilityTest {
    public intro = "The Dale–Chall readability formula is a readability test that provides a numeric gauge of the comprehension difficulty that readers come upon when reading a text. It uses a list of 3000 words that groups of fourth-grade American students could reliably understand, considering any word not on that list to be difficult.";
    public meaning = "The Dale–Chall readability formula is a readability test that provides a numeric gauge of the comprehension difficulty that readers come upon when reading a text. It uses a list of 3000 words that groups of fourth-grade American students could reliably understand, considering any word not on that list to be difficult.";
    public scores: Array<RangeScore>;
    constructor() {
        this.scores = new Array<RangeScore>();

        let fifthGrade = new RangeScore(0, 4.9, `${USAGradeLevels.FirstGrade.name} to ${USAGradeLevels.FourthGrade.name}`, 'Easily understood by an average 4th-grade student or lower');
        this.scores.push(fifthGrade);

        let sixthGrade = new RangeScore(5, 5.9, `${USAGradeLevels.FifthGrade.name} to ${USAGradeLevels.SixthGrade.name}`, 'Easily understood by an average 5th or 6th-grade student');
        this.scores.push(sixthGrade);

        let seventhGrade = new RangeScore(6.0, 6.9, `${USAGradeLevels.SeventhGrade.name} to ${USAGradeLevels.EighthGrade.name}`, 'Easily understood by an average 7th or 8th-grade student');
        this.scores.push(seventhGrade);

        let eighthNinethGrade = new RangeScore(7.0, 7.9, `${USAGradeLevels.NinthGrade.name} to ${USAGradeLevels.TenthGrade.name}`, 'Easily understood by an average 9th or 10th-grade student');
        this.scores.push(eighthNinethGrade);

        let tenthToTwelfthGrade = new RangeScore(8.0, 8.9, `${USAGradeLevels.EleventhGrade.name} to ${USAGradeLevels.TwelfthGrade.name}`, 'Easily understood by an average 11th or 12th-grade student');
        this.scores.push(tenthToTwelfthGrade);

        let college = new RangeScore(9.0, 9.9, `${USAGradeLevels.CollegeFreshman.name} to ${USAGradeLevels.CollegeJunior.name}`, 'easily understood by an average 13th to 15th-grade (college) student.');
        this.scores.push(college);
    }
}

