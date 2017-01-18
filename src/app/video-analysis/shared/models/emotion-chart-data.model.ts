import { ChartData } from './chart-data.model';
import { TimeMarker } from './time-marker.model';
import { Emotion } from './emotion.model';


export class EmotionChartData extends ChartData {

    public static chartLabels: string[] = ['Happiness', 'Surprise', 'Sadness', 'Anger', 'Disgust', 'Fear', 'Contempt'];
    timeMarker: TimeMarker;

    constructor(timeMarker: TimeMarker, label: string, normalizeFactor = 1) {
        super();
        this.label = label;
        this.timeMarker = timeMarker;

        let AddToRest = 0;
        let neutralValue = 0//this.getPercentage(timeMarker.emotion.neutral);
        if (normalizeFactor > 1) {
            let originalValue = this.getPercentage(timeMarker.emotion.neutral);
            neutralValue = originalValue / normalizeFactor;
            let rest = originalValue - neutralValue;
            AddToRest = rest / (EmotionChartData.chartLabels.length - 1);
        }

        //this.data.push(neutralValue);
        this.data.push(this.getPercentage(timeMarker.emotion.happiness) + AddToRest);
        this.data.push(this.getPercentage(timeMarker.emotion.surprise) + AddToRest);
        this.data.push(this.getPercentage(timeMarker.emotion.sadness) + AddToRest);
        this.data.push(this.getPercentage(timeMarker.emotion.anger) + AddToRest);
        this.data.push(this.getPercentage(timeMarker.emotion.disgust) + AddToRest);
        this.data.push(this.getPercentage(timeMarker.emotion.fear) + AddToRest);
        this.data.push(this.getPercentage(timeMarker.emotion.contempt) + AddToRest);

        // this.removeEmotion('Neutral');
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

    private removeEmotion(emotionName: string) {
        let index = EmotionChartData.chartLabels.indexOf(emotionName);
        debugger;
        this.data.slice(index, 1);
        EmotionChartData.chartLabels.slice(index, 1);
    }

}