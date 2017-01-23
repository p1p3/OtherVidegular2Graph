import { SelectRecordService } from './../../core/services/select-record.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-static-data-analysis',
  templateUrl: './static-data-analysis.component.html',
  styleUrls: ['./static-data-analysis.component.css']
})
export class StaticDataAnalysisComponent implements OnInit {
  private recordId = '03685a6c-37b1-453a-8aa8-cc62e4698074';
  constructor( @Inject('ISelectRecordService') private recordSelectService: SelectRecordService) {
    this.recordId = this.recordSelectService.selectedRecord.assetId;
  }

  ngOnInit() {
  }

}
