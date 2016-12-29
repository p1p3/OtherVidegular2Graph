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
  declarations: [linearGaugeComponent],
  exports: [ChartsModule,
    // ChartsJsModule ,
    linearGaugeComponent,
    GaugeModule]
})
export class BSChartsModule { }
