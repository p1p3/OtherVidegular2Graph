import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmotionPreviewComponent } from './emotion-preview.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [EmotionPreviewComponent],
  exports: [EmotionPreviewComponent]
})
export class EmotionPreviewModule { }
