import { Observable } from 'rxjs/Rx';
import { WordWeight } from './../../charts/word-cloud/shared/word-weight.model';
import { TextAnalytics } from './../shared/models/text-analytics/text-analytics.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css']
})
export class WordCloudComponent implements OnInit {
  @Input() textAnalytics: Observable<TextAnalytics>;
  private words = new Array<WordWeight>();

  constructor() { }

  ngOnInit() {
    this.textAnalytics.subscribe(analytics => {
      this.words = analytics.keywordDensity
        .map(keyword => new WordWeight(keyword.item, keyword.count));
    }
    );
  }
}
