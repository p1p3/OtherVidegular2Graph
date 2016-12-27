import { TimeMarker } from '../shared/models/time-marker.model';
import { LinearGaugeOptions } from './../../charts/linear-gauge/shared/linear-gauge-options.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sentiments-preview',
  templateUrl: './sentiments-preview.component.html',
  styleUrls: ['./sentiments-preview.component.css']
})
export class SentimentsPreviewComponent implements OnInit {
  @Input() markers: Observable<TimeMarker>;

  public linearGaugeSource: Observable<number>;
  public linearGaugeOptions: LinearGaugeOptions;
  public sentimentSource = new Subject<number>();

  constructor() { }

  ngOnInit() {
    this.initLinearGauge();
    this.markers.subscribe(timneMark => {
      this.sentimentSource.next(timneMark.sentiment.Positiveness);
    });
  }

  private initLinearGauge() {
    this.linearGaugeOptions = new LinearGaugeOptions(0, 100, 0);
    this.linearGaugeOptions.addRange(0, 49, 'red');
    this.linearGaugeOptions.addRange(50, 100, 'green');
    this.linearGaugeSource = this.sentimentSource.asObservable();
  }

}
