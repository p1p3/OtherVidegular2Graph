import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [],
  exports: [ChartsModule]
})
export class BSChartsModule { }
