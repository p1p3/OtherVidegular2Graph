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
    private sources: Array<Object>;
    private api: VgAPI;
    private recordId = 'z4eee59e-f1ae-4882-9bbe-ee0c409c5ded';
    private currentTimeMarkerSource = new Subject<TimeMarker>();
    private markersSource = new Array<TimeMarker>();
    private currentTimeMarker: TimeMarker;

    constructor( @Inject('IEmotionService') private emotionService: IEmotionService) {
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


}
