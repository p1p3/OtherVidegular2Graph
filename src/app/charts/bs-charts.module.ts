import { ChartsJsModule } from './chartJs/chartsJs';
import { linearGaugeComponent } from './linear-gauge/linear-gauge.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    //ChartsJsModule
  ],
  declarations: [linearGaugeComponent],
  exports: [ChartsModule, linearGaugeComponent,/*ChartsJsModule*/]
})
export class BSChartsModule { }
