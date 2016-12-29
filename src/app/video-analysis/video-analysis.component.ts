import { GaugeSegment, GaugeLabel } from 'ng2-kw-gauge';
import { Insight } from './shared/models/Insights/insight.model';
import { IInsightService } from './shared/services/def/insights.service';
import { TimeMarker } from './shared/models/time-marker.model';
import { Emotion } from './shared/models/emotion.model';
import { IEmotionService } from './shared/services/def/emotions.service';
import { Subject, Observable, Operator } from 'rxjs/Rx';
import { VgAPI } from 'videogular2/core';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'app-video-analysis',
    templateUrl: 'video-analysis.component.html',
    styleUrls: ['video-analysis.component.css']
})
export class VideoAnalysisComponent implements OnInit {
    public oneAtATime: boolean = true;

    private sources: Array<Object>;
    private api: VgAPI;
    private recordId = 'z4eee59e-f1ae-4882-9bbe-ee0c409c5ded';
    private currentTimeMarkerSource = new Subject<TimeMarker>();
    private markersSource = new Array<TimeMarker>();
    private currentTimeMarker: TimeMarker;

    constructor( @Inject('IEmotionService') private emotionService: IEmotionService,
        @Inject('IInsightService') private insightService: IInsightService) {
        this.sources = [
            {
                src: "http://static.videogular.com/assets/videos/videogular.mp4",
                type: "video/mp4"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.ogg",
                type: "video/ogg"
            },
            {
                src: "http://static.videogular.com/assets/videos/videogular.webm",
                type: "video/webm"
            }
        ];
    }

    ngOnInit() {
        this.fetchTimeMarkers(this.recordId);
    }

    private fetchTimeMarkers(recordId: string) {
        this.emotionService.getRecordEmotions(recordId).subscribe(timeMarkers => {
            this.markersSource = timeMarkers;
            this.markersSource.sort((a, b) => a.startTime - b.startTime)
        });
    }

    onPlayerReady(api: VgAPI) {
        this.api = api;
        this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(time => {
            let currentTime = this.api.getDefaultMedia().currentTime;

            let timeMarker = this.markersSource.find(timeMarker => this.isCurrentTimeInTimeMarkerInRange(currentTime, timeMarker));

            if (timeMarker && (this.isNotBeingDisplayed(timeMarker) || (!this.isNotNull(this.currentTimeMarker)))) {
                this.currentTimeMarkerSource.next(timeMarker);
            }
        });
    }

    isCurrentTimeInTimeMarkerInRange(currentTime: number, timeMarker: TimeMarker): boolean {
        return (currentTime >= timeMarker.startTime && currentTime <= timeMarker.endTime);
    }

    isNotNull(obj: any): boolean {
        return obj;
    }

    isNotBeingDisplayed(timeMarker: TimeMarker): boolean {
        return this.currentTimeMarker !== timeMarker;
    }


    get currentMarkerObservable(): Observable<TimeMarker> {
        return this.currentTimeMarkerSource.asObservable();
    }


    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions: any = {
        animation: false,
        responsive: true
    };
    public lineChartType: string = 'line';

    /* addData() {
         let _lineChartData: Array<any> = new Array(this.lineChartData.length);
         for (let dataset of this.lineChartData) {
             dataset.push(Math.random() * 100);
         }
     }*/

    public addData(data: ChartDataSet): void {
        //debugger;
        this.lineChartLabels.push('new');
        let _lineChartData = Array<any>();
        for (let dataSet of this.lineChartData) {
            let copy = Object.assign({ __proto__: dataSet.__proto__ }, dataSet);
            copy.data.push(Math.floor((Math.random() * 100) + 1));
            _lineChartData.push(copy);
            //dataSet.data.push(Math.floor((Math.random() * 100) + 1));
        }
        /* for (let i = 0; i < this.lineChartData.length; i++) {
             _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
             for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                 _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
             }
         }*/
        this.lineChartData = _lineChartData;
    }

    public _addData(): void {
        //debugger;
        this.lineChartLabels.push('new');
        let _lineChartData = Array<any>();
        for (let dataSet of this.lineChartData) {
            let copy = Object.assign({ __proto__: dataSet.__proto__ }, dataSet);
            copy.data.push(Math.floor((Math.random() * 100) + 1));
            _lineChartData.push(copy);
            //dataSet.data.push(Math.floor((Math.random() * 100) + 1));
        }
        /* for (let i = 0; i < this.lineChartData.length; i++) {
             _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
             for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                 _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
             }
         }*/
        this.lineChartData = _lineChartData;
    }
    colors = {
        indigo: '#14143e',
        pink: '#fd1c49',
        orange: '#ff6e00',
        yellow: '#f0c800',
        mint: '#00efab',
        cyan: '#05d1ff',
        purple: '#841386',
        white: '#fff'
    };

    progressGraph = {
        bgRadius: 60,
        bgColor: this.colors.indigo,
        rounded: false,
        reverse: false,
        animationSecs: 1,
        labels: [
            new GaugeLabel({
                color: this.colors.white,
                text: 'Reading Ease',
                x: 0,
                y: 20,
                fontSize: '1em'
            }),
            new GaugeLabel({
                color: this.colors.pink,
                text: '81%',
                x: 0,
                y: 0,
                fontSize: '2em'
            })
        ],
        segments: [
            new GaugeSegment({
                value: 81,
                color: this.colors.pink,
                borderWidth: 20
            })
        ]
    };

}
