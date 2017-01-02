import { WordCloudDirective } from './word-cloud/word-cloud.directive';
import { ChartsJsModule } from './chartJs/chartsJs';
import { linearGaugeComponent } from './linear-gauge/linear-gauge.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { GaugeModule } from 'ng2-kw-gauge';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    GaugeModule,
    //ChartsJsModule
  ],
  declarations: [linearGaugeComponent, WordCloudDirective],
  exports: [ChartsModule,
    // ChartsJsModule ,
    linearGaugeComponent,
    GaugeModule,
    WordCloudDirective]
})
export class BSChartsModule { }
