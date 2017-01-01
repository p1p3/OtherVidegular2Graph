import { TimeMarker } from './../shared/models/time-marker.model';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transcription-preview',
  templateUrl: './transcription-preview.component.html',
  styleUrls: ['./transcription-preview.component.css']
})
export class TranscriptionPreviewComponent implements OnInit {

  @Input() markers: Observable<TimeMarker[]>;
  @Input() selectedMarker: Observable<TimeMarker>;

  private currentMarker: TimeMarker;
  private timeMarkers: TimeMarker[];
  constructor() { }

  ngOnInit() {
    this.markers.subscribe(timeMarkers => {
      this.timeMarkers = timeMarkers;
    });

    this.selectedMarker.subscribe(marker => this.currentMarker = marker);
  }

  private isSelected(marker: TimeMarker): boolean {
    return this.currentMarker && this.currentMarker.markerId === marker.markerId;
  }
}
