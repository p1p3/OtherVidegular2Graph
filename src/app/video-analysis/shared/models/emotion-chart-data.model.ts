import { ChartData } from './chart-data.model';
import { TimeMarker } from './time-marker.model';
import { Emotion } from './emotion.model';


export class EmotionChartData extends ChartData {

    public static chartLabels: string[] = ['Neutral', 'Happiness', 'Surprise', 'Sadness', 'Anger', 'Disgust', 'Fear', 'Contempt'];
    timeMarker: TimeMarker;

    constructor(timeMarker: TimeMarker, label: string ) {
        super();
        this.label = label;
        this.timeMarker = timeMarker;

        this.data.push(this.getPercentage(timeMarker.emotion.neutral));
        this.data.push(this.getPercentage(timeMarker.emotion.happiness));
        this.data.push(this.getPercentage(timeMarker.emotion.surprise));
        this.data.push(this.getPercentage(timeMarker.emotion.sadness));
        this.data.push(this.getPercentage(timeMarker.emotion.anger));
        this.data.push(this.getPercentage(timeMarker.emotion.disgust));
        this.data.push(this.getPercentage(timeMarker.emotion.fear));
        this.data.push(this.getPercentage(timeMarker.emotion.contempt));

        this.checkIfDataMatchLabels();
    }

    private checkIfDataMatchLabels() {
        if (this.data.length !== EmotionChartData.chartLabels.length) {
            console.error('Labels does not match the data lenght');
        }
    }

    private getPercentage(value: number) {
        return value * 100;
    }

}