import { ChartData } from './chart-data.model';
import { TimeMarker } from './time-marker.model';


export class EmotionTimelineChartData {

    private chartLabels: string[] = ['Neutral', 'Happiness', 'Surprise', 'Sadness', 'Anger', 'Disgust', 'Fear', 'Contempt'];
    public markersLabels = new Array<string>();
    public data = new Array<ChartData>(this.chartLabels.length);
    timeMarkers: Array<TimeMarker>;

    constructor(timeMarkers: Array<TimeMarker>, normalizeFactor = 1) {

        for (let index = 0; index < this.chartLabels.length; index++) {
            this.data[index] = new ChartData();
            this.data[index].label = this.chartLabels[index];
        }



        this.timeMarkers = timeMarkers;
        timeMarkers.forEach(marker => {

            let AddToRest = 0;
            let neutralValue = this.getPercentage(marker.emotion.neutral);
            if (normalizeFactor > 1) {
                let originalValue = this.getPercentage(marker.emotion.neutral);
                neutralValue = originalValue / normalizeFactor;
                let rest = originalValue - neutralValue;
           //     AddToRest = rest / (this.chartLabels.length - 1);
            }

            this.data[0].data.push(neutralValue);
            this.data[1].data.push(this.getPercentage(marker.emotion.happiness));
            this.data[2].data.push(this.getPercentage(marker.emotion.surprise)+ AddToRest);
            this.data[3].data.push(this.getPercentage(marker.emotion.sadness)+ AddToRest);
            this.data[4].data.push(this.getPercentage(marker.emotion.anger)+ AddToRest);
            this.data[5].data.push(this.getPercentage(marker.emotion.disgust)+ AddToRest);
            this.data[6].data.push(this.getPercentage(marker.emotion.fear)+ AddToRest);
            this.data[7].data.push(this.getPercentage(marker.emotion.contempt)+ AddToRest);

  
            this.markersLabels.push(marker.formatedHmsStartTime);
        });


    }


    private getPercentage(value: number) {
        return value * 100;
    }


}

