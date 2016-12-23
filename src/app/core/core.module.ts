import { AnalyticsService } from './services/analytics.service';
import { IAnalyticsService } from './services/def/analytics.service'
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [{ provide: 'IAnalyticsService', useClass: AnalyticsService }]
})
export class CoreModule { }
