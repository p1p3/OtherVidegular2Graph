import { MarkerPipe } from './shared/pipes/time-marker.pipe';
import { VideoAnalysisComponent } from './video-analysis.component';
import { BSChartsModule } from './../charts/bs-charts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AccordionModule } from 'ng2-bootstrap/accordion';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { TooltipModule } from 'ng2-bootstrap/tooltip';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

// tslint:disable-next-line:no-unused-variable
import { IEmotionService } from './shared/services/def/emotions.service';
import { EmotionService } from './shared/services/emotions.service';

// tslint:disable-next-line:no-unused-variable
import { IInsightService } from './shared/services/def/insights.service';
import { FakeInsightService } from './shared/services/insights-fake.service';

// tslint:disable-next-line:no-unused-variable
import { ITextAnalyticsService } from './shared/services/def/text-analytics.service';
import { TextAnalyticsService } from './shared/services/text-analytics.service';

import { EmotionPreviewComponent } from './emotions-preview/emotion-preview.component';
import { SentimentsPreviewComponent } from './sentiments-preview/sentiments-preview.component';
import { PersonalityInsightsComponent } from './personality-insights/personality-insights.component';
import { EmotionTimeLineComponent } from './emotion-time-line/emotion-time-line.component';
import { SentimentTimeLineComponent } from './sentiment-time-line/sentiment-time-line.component';
import { TranscriptionPreviewComponent } from './transcription-preview/transcription-preview.component';
import { ReadingEasePreviewComponent } from './reading-ease-preview/reading-ease-preview.component';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    BSChartsModule,
    VgCoreModule,
    VgOverlayPlayModule,
    VgControlsModule,
    VgBufferingModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [EmotionPreviewComponent, VideoAnalysisComponent,
    SentimentsPreviewComponent, PersonalityInsightsComponent,
    EmotionTimeLineComponent, SentimentTimeLineComponent,
    TranscriptionPreviewComponent, ReadingEasePreviewComponent,
    MarkerPipe],
  exports: [VideoAnalysisComponent],
  providers: [{ provide: 'IEmotionService', useClass: EmotionService },
  { provide: 'IInsightService', useClass: FakeInsightService },
  { provide: 'ITextAnalyticsService', useClass: TextAnalyticsService }]
})
export class VideoAnalysisModule { }
