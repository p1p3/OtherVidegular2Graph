import { TimeMarker } from './../shared/models/time-marker.model';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transcription-preview',
  templateUrl: './transcription-preview.component.html',
  styleUrls: ['./transcription-preview.component.css']
})
export class TranscriptionPreviewComponent implements OnInit {

  @Input() markers: Observable<TimeMarker[]>;
  @Input() selectedMarker: Observable<TimeMarker>;
  @Output() markerClick = new EventEmitter<TimeMarker>();

  private currentMarker: TimeMarker;
  private timeMarkers: TimeMarker[];
  private currentSelector: string;

  constructor() { }

  ngOnInit() {
    this.markers.subscribe(timeMarkers => {
      this.timeMarkers = timeMarkers;
    });

    this.selectedMarker.subscribe(marker => {
      this.currentMarker = marker;
      if (this.timeMarkers) {
        let index = this.timeMarkers.findIndex(markerIndex => marker.markerId === markerIndex.markerId);
        this.currentSelector = this.createIdSelector(index);
      }
    });
  }

  private isSelected(marker: TimeMarker): boolean {
    return this.currentMarker && this.currentMarker.markerId === marker.markerId;
  }

  private selectMarker(marker: TimeMarker): void {
    this.markerClick.emit(marker);
  }

  private createIdSelector(num: number) {
    return `scrollMark-${num}`;
  }
}
