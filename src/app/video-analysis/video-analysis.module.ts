import { VideoAnalysisRoutingModule } from './video-analysis-routing.module';
import { SharedModule } from './../shared/shared.module';
import { MarkerPipe } from './shared/pipes/time-marker.pipe';
import { VideoAnalysisComponent } from './video-analysis.component';
import { BSChartsModule } from './../charts/bs-charts.module';
import { NgModule } from '@angular/core';

import { AccordionModule } from 'ng2-bootstrap/accordion';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { TooltipModule } from 'ng2-bootstrap/tooltip';
import { ModalModule } from 'ng2-bootstrap/modal';

import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';

import { FlexLayoutModule } from '@angular/flex-layout';

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
import { WordCloudComponent } from './word-cloud/word-cloud.component';
import { TextAnalysisPreviewComponent } from './text-analysis-preview/text-analysis-preview.component';
import { RealTimeAnalysisComponent } from './real-time-analysis/real-time-analysis.component';
import { StaticDataAnalysisComponent } from './static-data-analysis/static-data-analysis.component';
import { EmotionsFulldataPreviewComponent } from './emotions-fulldata-preview/emotions-fulldata-preview.component';


const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    BSChartsModule,
    VgCoreModule,
    VgOverlayPlayModule,
    VgControlsModule,
    VgBufferingModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FlexLayoutModule.forRoot(),
    ModalModule.forRoot(),
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    SharedModule,
    VideoAnalysisRoutingModule
  ],
  declarations: [EmotionPreviewComponent, VideoAnalysisComponent,
    SentimentsPreviewComponent, PersonalityInsightsComponent,
    EmotionTimeLineComponent, SentimentTimeLineComponent,
    TranscriptionPreviewComponent, ReadingEasePreviewComponent,
    MarkerPipe,
    WordCloudComponent,
    TextAnalysisPreviewComponent,
    RealTimeAnalysisComponent,
    StaticDataAnalysisComponent,
    EmotionsFulldataPreviewComponent],
  exports: [VideoAnalysisComponent],
  providers: [{ provide: 'IEmotionService', useClass: EmotionService },
  { provide: 'IInsightService', useClass: FakeInsightService },
  { provide: 'ITextAnalyticsService', useClass: TextAnalyticsService }]
})
export class VideoAnalysisModule { }

