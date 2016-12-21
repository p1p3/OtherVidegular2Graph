import { EmotionAnalysisComponent } from './emotion-analysis.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { ChartsModule } from 'ng2-charts/ng2-charts';


import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';


import { EmotionPreviewComponent } from './emotions-preview/emotion-preview.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ChartsModule,
    VgCoreModule,
    VgOverlayPlayModule,
    VgControlsModule,
    VgBufferingModule
  ],
  declarations: [EmotionPreviewComponent, EmotionAnalysisComponent],
  exports: [EmotionAnalysisComponent]
})
export class EmotionAnalysisModule { }
