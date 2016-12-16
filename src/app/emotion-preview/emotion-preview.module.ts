import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmotionPreviewComponent } from './emotion-preview.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { VgCoreModule } from 'videogular2/core';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgControlsModule } from 'videogular2/controls';
import { VgBufferingModule } from 'videogular2/buffering';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    VgCoreModule,
    VgOverlayPlayModule,
    VgControlsModule,
    VgBufferingModule
  ],
  declarations: [EmotionPreviewComponent],
  exports: [EmotionPreviewComponent]
})
export class EmotionPreviewModule { }
