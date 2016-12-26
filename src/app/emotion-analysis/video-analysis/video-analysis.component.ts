import { LinearGaugeOptions } from './../../charts/linear-gauge/shared/linear-gauge-options.model';
import { IEmotionService } from './../shared/services/def/emotions.service';
import { TimeMarker } from '../shared/models/time-marker.model';
import { Emotion } from '../shared/models/emotion.model';
import { EmotionChartData } from '../shared/models/emotion-chart-data.model';
import { Component, OnInit, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-video-analysis',
  templateUrl: './video-analysis.component.html',
  styleUrls: ['./video-analysis.component.css']
})
export class VideoAnalysisComponent implements OnInit {

  constructor(@Inject('IEmotionService') private emotionService: IEmotionService) { }

  ngOnInit() {
  }

}

export enum GraphType {
  doughnut = 0,
  radar,
  bars
}



