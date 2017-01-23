import { FormsModule } from '@angular/forms';
import { SelectRecordService } from './services/select-record.service';
import { SelectRecordComponent } from './components/select-record/select-record.component';
import { AnalyticsService } from './services/analytics.service';
import { IAnalyticsService } from './services/def/analytics.service';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ng2-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  declarations: [SelectRecordComponent],
  exports: [SelectRecordComponent],
  providers: [{ provide: 'IAnalyticsService', useClass: AnalyticsService },
  { provide: 'ISelectRecordService', useClass: SelectRecordService }]
})
export class CoreModule { }
