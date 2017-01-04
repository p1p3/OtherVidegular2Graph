import { TextAnalytics } from './../text-analytics.model';
import { ChartData } from './../../chart-data.model';
export class ReadingGradeLevelChartData extends ChartData {
    public static chartLabels: string[] = ['Neutral', 'Happiness', 'Surprise', 'Sadness', 'Anger', 'Disgust', 'Fear', 'Contempt'];
    textAnalytics: TextAnalytics;

    constructor(textAnalytics: TextAnalytics, label: string) {
        super();
        this.label = label;
        this.textAnalytics = textAnalytics;

        this.data.push(textAnalytics.fleschKincaidGradeLevel);
        this.data.push(textAnalytics.spacheReadabilityScore);
        this.data.push(textAnalytics.gunningFogScore);
        this.data.push(textAnalytics.colemanLiauIndex);
        this.data.push(textAnalytics.automatedReadabilityIndex);
        this.data.push(textAnalytics.spacheReadabilityScore);
        this.data.push(textAnalytics.daleChallReadabilityScore);


        this.checkIfDataMatchLabels();
    }

    private checkIfDataMatchLabels() {
        if (this.data.length !== ReadingGradeLevelChartData.chartLabels.length) {
            console.error('Labels does not match the data lenght');
        }
    }
}
