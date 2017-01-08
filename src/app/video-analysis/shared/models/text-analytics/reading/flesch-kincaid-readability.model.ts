import { ReadabilityTest } from './readability-test.model';
import { RangeScore } from './range-score.model';
import { USAGradeLevels } from './united-states-grades.model';
import { RangeBasedTest } from './range-based-test.model';

export class FleschKincaidReadability extends RangeBasedTest implements ReadabilityTest {
    public meaning: string;
    public intro: string;
    public lessIsBetter: boolean;

    private setValues() {
        this.meaning = 'In the Flesch reading-ease test, higher scores indicate material that is easier to read; lower numbers mark passages that are more difficult to read.';
        this.intro = 'The Flesch–Kincaid readability tests are readability tests designed to indicate how difficult a reading passage in English is to understand.';
        this.lessIsBetter = false;
    }

    constructor() {
        let scores = new Array<RangeScore>();

        let fifthGrade = new RangeScore(90, 100, USAGradeLevels.FifthGrade.name, 'Very easy to read. Easily understood by an average 11-year-old student');
        scores.push(fifthGrade);

        let sixthGrade = new RangeScore(80, 90, USAGradeLevels.SixthGrade.name, 'Easy to read. Conversational English for consumers.');
        scores.push(sixthGrade);

        let seventhGrade = new RangeScore(70, 80, USAGradeLevels.SeventhGrade.name, 'Fairly easy to read.');
        scores.push(seventhGrade);

        let eighthNinethGrade = new RangeScore(60, 70, `${USAGradeLevels.EighthGrade.name} & ${USAGradeLevels.NinthGrade.name}`, 'Plain English. Easily understood by 13- to 15-year-old students.');
        scores.push(eighthNinethGrade);

        let tenthToTwelfthGrade = new RangeScore(50, 60, `${USAGradeLevels.EighthGrade.name} to ${USAGradeLevels.NinthGrade.name}`, 'Fairly difficult to read.');
        scores.push(tenthToTwelfthGrade);

        let college = new RangeScore(30, 50, USAGradeLevels.College, 'Difficult to read.');
        scores.push(college);

        let collegeGraduated = new RangeScore(0, 30, USAGradeLevels.CollegeGraduate.name, 'Very difficult to read. Best understood by university graduates.');
        scores.push(collegeGraduated);

        super(scores);
        this.setValues();

    }

}

