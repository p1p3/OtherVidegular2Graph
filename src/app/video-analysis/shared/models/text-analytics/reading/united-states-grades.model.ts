import { IndexScore } from './index-score-model';
import { Grade } from './grade.model';
export class USAGradeLevels {
    public IndexsScores: Array<IndexScore>;

    constructor(bias = 0, upToGrade?: Grade) {
        this.IndexsScores = new Array<IndexScore>();
        
        let grade0 = new IndexScore(USAGradeLevels.KinderGarten.level + bias, USAGradeLevels.KinderGarten.name);
        this.IndexsScores.push(grade0);

        let grade1 = new IndexScore(USAGradeLevels.FirstGrade.level + bias, USAGradeLevels.FirstGrade.name);
        this.IndexsScores.push(grade1);

        let grade2 = new IndexScore(USAGradeLevels.SecondGrade.level + bias, USAGradeLevels.SecondGrade.name);
        this.IndexsScores.push(grade2);

        let grade3 = new IndexScore(USAGradeLevels.ThirdGrade.level + bias, USAGradeLevels.ThirdGrade.name);
        this.IndexsScores.push(grade3);

        let grade4 = new IndexScore(USAGradeLevels.FourthGrade.level + bias, USAGradeLevels.FourthGrade.name);
        this.IndexsScores.push(grade4);

        let grade5 = new IndexScore(USAGradeLevels.FifthGrade.level + bias, USAGradeLevels.FifthGrade.name);
        this.IndexsScores.push(grade5);

        let grade6 = new IndexScore(USAGradeLevels.SixthGrade.level + bias, USAGradeLevels.SixthGrade.name);
        this.IndexsScores.push(grade6);

        let grade7 = new IndexScore(USAGradeLevels.SeventhGrade.level + bias, USAGradeLevels.SeventhGrade.name);
        this.IndexsScores.push(grade7);

        let grade8 = new IndexScore(USAGradeLevels.EighthGrade.level + bias, USAGradeLevels.EighthGrade.name);
        this.IndexsScores.push(grade8);

        let grade9 = new IndexScore(USAGradeLevels.NinthGrade.level + bias, USAGradeLevels.NinthGrade.name);
        this.IndexsScores.push(grade9);

        let grade10 = new IndexScore(USAGradeLevels.TenthGrade.level + bias, USAGradeLevels.TenthGrade.name);
        this.IndexsScores.push(grade10);

        let grade11 = new IndexScore(USAGradeLevels.EleventhGrade.level + bias, USAGradeLevels.EleventhGrade.name);
        this.IndexsScores.push(grade11);

        let grade12 = new IndexScore(USAGradeLevels.TwelfthGrade.level + bias, USAGradeLevels.TwelfthGrade.name);
        this.IndexsScores.push(grade12);

        let grade13 = new IndexScore(USAGradeLevels.CollegeFreshman.level + bias, USAGradeLevels.CollegeFreshman.name);
        this.IndexsScores.push(grade13);

        let grade14 = new IndexScore(USAGradeLevels.CollegeSophomore.level + bias, USAGradeLevels.CollegeSophomore.name);
        this.IndexsScores.push(grade14);

        let grade15 = new IndexScore(USAGradeLevels.CollegeJunior.level + bias, USAGradeLevels.CollegeJunior.name);
        this.IndexsScores.push(grade15);

        let grade16 = new IndexScore(USAGradeLevels.CollegeSenior.level + bias, USAGradeLevels.CollegeSenior.name);
        this.IndexsScores.push(grade16);

        let grade17 = new IndexScore(USAGradeLevels.CollegeGraduate.level + bias, USAGradeLevels.CollegeGraduate.name);
        this.IndexsScores.push(grade17);

        if (upToGrade) {
            this.IndexsScores = this.IndexsScores.filter(index => index.index <= upToGrade.level + bias);
        }

    }



    public static KinderGarten = new Grade(0, 'Kindergarten');
    public static FirstGrade = new Grade(1, 'First grade');
    public static SecondGrade = new Grade(2, 'Second grade');
    public static ThirdGrade = new Grade(3, 'Third grade');
    public static FourthGrade = new Grade(4, 'Fourth grade');
    public static FifthGrade = new Grade(5, 'Fifth grade');
    public static SixthGrade = new Grade(6, 'Sixth grade');
    public static SeventhGrade = new Grade(7, 'Seventh grade');
    public static EighthGrade = new Grade(8, ' Eighth grade');
    public static NinthGrade = new Grade(9, 'Ninth grade (Freshman)');
    public static TenthGrade = new Grade(10, 'Tenth grade (Sophomore)');
    public static EleventhGrade = new Grade(11, 'Eleventh grade (Junior)');
    public static TwelfthGrade = new Grade(12, 'Twelfth grade (Senior)');

    public static CollegeFreshman = new Grade(13, 'College freshman');
    public static CollegeSophomore = new Grade(14, 'College sophomore');
    public static CollegeJunior = new Grade(15, 'College junior');
    public static CollegeSenior = new Grade(16, 'College senior');
    public static CollegeGraduate = new Grade(17, 'College graduated');

    public static College = 'College';
}
