import { TickMarkerData } from './tick-marker-data.model';
import { ChartData } from './../chart-data.model';
import { FullEmotion } from './full-emotion.model';

export class FullEmotionTimelineChartData {
    public chartLabels: string[] = ['Happiness', 'Surprise', 'Sadness', 'Anger', 'Disgust', 'Fear', 'Contempt'];
    private markersLabels = new Array<string>();
    private normalizeFactor: number;
    private fullEmotion: FullEmotion;

    constructor(fullEmotion: FullEmotion, normalizeFactor = 1) {
        this.fullEmotion = fullEmotion;
        this.normalizeFactor = normalizeFactor;
    }

    public getDataUntil(seconds: number, normalizeFactor = 1, limitDataTo = 0): { data: Array<ChartData>, labels: Array<string> } {
        let data = new Array<ChartData>(this.chartLabels.length);
        let markersLabels = new Array<string>();
        for (let index = 0; index < this.chartLabels.length; index++) {
            data[index] = new ChartData();
            data[index].label = this.chartLabels[index];
        }

        markersGroupLoop:
        for (let markerGroup of this.fullEmotion.TickMarkers) {
            let groupEndingTimeLessThanCurrentTime = markerGroup.endTimeInSeconds <= seconds;
            let lastMarker: TickMarkerData;

            for (let marker of markerGroup.faceDistributions) {

                if (marker.equalStartTime(lastMarker)) {
                    //TODO : Mean between seconds, for the moment just ignore the others.
                    continue;
                };

                markersLabels.push(marker.formatedHmsStartTime);
                lastMarker = marker;

                let markerEndingTimeGreaterThanLimit = marker.endTimeInSeconds > seconds;
                let AddToRest = 0;
                let neutralValue = 0;
                if (normalizeFactor > 1) {
                    let originalValue = this.getPercentage(marker.emotion.neutral);
                    let rest = originalValue - neutralValue;
                    AddToRest = rest / (this.chartLabels.length - 1);
                    // console.log(marker.startTick + ' --- ' + marker.startTimeInSeconds + ' ---- ' + AddToRest);
                    // console.log(marker.emotion);
                }

                data[0].data.push(this.getPercentage(marker.emotion.happiness) + AddToRest);
                data[1].data.push(this.getPercentage(marker.emotion.surprise) + AddToRest);
                data[2].data.push(this.getPercentage(marker.emotion.sadness) + AddToRest);
                data[3].data.push(this.getPercentage(marker.emotion.anger) + AddToRest);
                data[4].data.push(this.getPercentage(marker.emotion.disgust) + AddToRest);
                data[5].data.push(this.getPercentage(marker.emotion.fear) + AddToRest);
                data[6].data.push(this.getPercentage(marker.emotion.contempt) + AddToRest);

                if (limitDataTo > 0 && data[0].data.length > limitDataTo) {
                    data.forEach(emotionsData => {
                        emotionsData.data.shift();
                    });
                    markersLabels.shift();
                }

                if (markerEndingTimeGreaterThanLimit) {
                    break markersGroupLoop;
                }
            }

            if (!groupEndingTimeLessThanCurrentTime) {
                break;
            }
        }

        return { data: data, labels: markersLabels };
    }




    private getPercentage(value: number) {
        return value * 100;
    }
}
