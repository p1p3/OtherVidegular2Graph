import { ChartData } from './chart-data.model';
import { TimeMarker } from './time-marker.model';


export class EmotionTimelineChartData {

    private chartLabels: string[] = ['Neutral', 'Happiness', 'Surprise', 'Sadness', 'Anger', 'Disgust', 'Fear', 'Contempt'];
    public markersLabels = new Array<string>();
    public data = new Array<ChartData>(this.chartLabels.length);
    timeMarkers: Array<TimeMarker>;

    constructor(timeMarkers: Array<TimeMarker>) {

        for (let index = 0; index < this.chartLabels.length; index++) {
            this.data[index] = new ChartData();
            this.data[index].label = this.chartLabels[index];
        }

        this.timeMarkers = timeMarkers;
        timeMarkers.forEach(marker => {
            this.data[0].data.push(this.getPercentage(marker.emotion.neutral));
            this.data[1].data.push(this.getPercentage(marker.emotion.happiness));
            this.data[2].data.push(this.getPercentage(marker.emotion.surprise));
            this.data[3].data.push(this.getPercentage(marker.emotion.sadness));
            this.data[4].data.push(this.getPercentage(marker.emotion.anger));
            this.data[5].data.push(this.getPercentage(marker.emotion.disgust));
            this.data[6].data.push(this.getPercentage(marker.emotion.fear));
            this.data[7].data.push(this.getPercentage(marker.emotion.contempt));

            this.markersLabels.push(marker.formatedHmsStartTime);
        });


    }


    private getPercentage(value: number) {
        return value * 100;
    }


}

