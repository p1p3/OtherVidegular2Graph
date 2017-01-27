import { RecordSelect } from './../../core/models/record-select.model';
import { SelectRecordService } from './../../core/services/select-record.service';
import { ITextAnalyticsService } from '../shared/services/def/text-analytics.service';
import { Sentiment } from '../shared/models/sentiment.model';
import { IInsightService } from '../shared/services/def/insights.service';
import { TimeMarker } from '../shared/models/time-marker.model';
import { Emotion } from '../shared/models/emotion.model';
import { IEmotionService } from '../shared/services/def/emotions.service';
import { Subject, Observable } from 'rxjs/Rx';
import { VgAPI } from 'videogular2/core';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-real-time-analysis',
  templateUrl: './real-time-analysis.component.html',
  styleUrls: ['./real-time-analysis.component.css']
})
export class RealTimeAnalysisComponent implements OnInit, OnDestroy {
  private selectedRecord: RecordSelect;
  private recordId: string;
  private sources: Array<Object>;

  public oneAtATime: boolean = false;
  private api: VgAPI;

  private currentTimeMarkerSource = new Subject<TimeMarker>();
  private currentTimeMarkersSource = new Subject<TimeMarker[]>();
  private markersSource = new Array<TimeMarker>();
  private timeMarkersObservable: Observable<TimeMarker[]>;
  private currentTimeObsevable: Observable<number>;
  private currentTimeMarker: TimeMarker;

  constructor( @Inject('IEmotionService') private emotionService: IEmotionService,
    @Inject('ISelectRecordService') private recordSelectService: SelectRecordService,
    private route: ActivatedRoute, ) {
    this.selectedRecord = this.recordSelectService.selectedRecord;
    this.sources = [
      {
        src: this.selectedRecord.videoURL,
        type: 'video/mp4'
      }
    ];

    this.recordId = this.selectedRecord.assetId;
  }

  ngOnInit() {
    this.currentTimeObsevable = new Observable<number>().startWith(0);
    this.fetchTimeMarkers(this.recordId);
  }

  private fetchTimeMarkers(recordId: string) {
    this.timeMarkersObservable = this.emotionService.getRecordEmotions(recordId);
    this.timeMarkersObservable.subscribe(timeMarkers => {
      this.markersSource = timeMarkers;
      this.markersSource.sort((a, b) => a.startTime - b.startTime);
    });
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.currentTimeObsevable = this.api.getDefaultMedia()
      .subscriptions.timeUpdate
      .map(time => this.api.getDefaultMedia().currentTime);

    this.currentTimeObsevable.subscribe(currentTime => {
      let timeMarkerResult = this.markersSource.find(timeMarker => this.isCurrentTimeInTimeMarkerInRange(currentTime, timeMarker));

      if (timeMarkerResult && (this.isNotBeingDisplayed(timeMarkerResult) || (!this.isNotNull(this.currentTimeMarker)))) {
        this.currentTimeMarkerSource.next(timeMarkerResult);
        let timeMarkersSpan = this.markersSource.filter(timeMarker => this.timeMarkerInVideoRange(currentTime, timeMarker));
        this.currentTimeMarkersSource.next(timeMarkersSpan);
      }
    });
  }

  ngOnDestroy() {
    this.currentTimeObsevable = null;
  }

  isCurrentTimeInTimeMarkerInRange(currentTime: number, timeMarker: TimeMarker): boolean {
    return (currentTime >= timeMarker.startTime && currentTime <= timeMarker.endTime);
  }

  timeMarkerInVideoRange(currentTime: number, timeMarker: TimeMarker): boolean {
    return (currentTime >= timeMarker.startTime);
  }

  isNotNull(obj: any): boolean {
    return obj;
  }

  isNotBeingDisplayed(timeMarker: TimeMarker): boolean {
    return this.currentTimeMarker !== timeMarker;
  }


  get currentMarkerObservable(): Observable<TimeMarker> {
    return this.currentTimeMarkerSource
      .asObservable().startWith(this.getEmptyTimeMarker());
  }

  get currentMarkerersObservable(): Observable<TimeMarker[]> {
    return this.currentTimeMarkersSource
      .asObservable().startWith([this.getEmptyTimeMarker()]);
  }


  // tslint:disable-next-line:no-unused-variable
  private selectMarker(marker: TimeMarker) {
    let player = this.api.getDefaultMedia();
    player.currentTime = marker.startTime;
    player.play();
  }

  private getEmptyTimeMarker() {
    let emptyEmotion = new Emotion(0, 0, 0, 0, 0, 0, 0, 0);
    let emptySentiment = new Sentiment(0);
    let timeMarker = new TimeMarker('', 0, 0, emptyEmotion, emptySentiment, '');
    return timeMarker;
  }


}
