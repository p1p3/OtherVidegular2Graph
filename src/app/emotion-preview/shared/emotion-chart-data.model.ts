import { TimeMarker } from './time-marker.model';
import { Emotion } from './emotion.model';


export class EmotionChartData {

    public static chartLabels: string[] = ['Neutral', 'Happiness', 'Surprise', 'Sadness', 'Anger', 'Disgust', 'Fear', 'Contempt'];

    label: string;
    data = Array<number>();
    timeMarker: TimeMarker;

    constructor(emotion: Emotion, label: string, timeMarker: TimeMarker) {
        this.label = label;
        this.timeMarker = timeMarker;

        this.data.push(this.getPercentage(emotion.neutral));
        this.data.push(this.getPercentage(emotion.happiness));
        this.data.push(this.getPercentage(emotion.surprise));
        this.data.push(this.getPercentage(emotion.sadness));
        this.data.push(this.getPercentage(emotion.anger));
        this.data.push(this.getPercentage(emotion.disgust));
        this.data.push(this.getPercentage(emotion.fear));
        this.data.push(this.getPercentage(emotion.contempt));

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