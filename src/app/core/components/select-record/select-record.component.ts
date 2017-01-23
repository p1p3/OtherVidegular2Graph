import { SelectRecordService } from './../../services/select-record.service';
import { RecordSelect } from './../../models/record-select.model';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-select-record',
  templateUrl: './select-record.component.html',
  styleUrls: ['./select-record.component.css']
})
export class SelectRecordComponent implements OnInit {
  @ViewChild('childModal') public childModal: ModalDirective;
  record: RecordSelect;
  constructor( @Inject('ISelectRecordService') private recordSelectService: SelectRecordService) {
    this.record = recordSelectService.selectedRecord;
  }

  ngOnInit() {

  }

  onSubmit() {
    this.recordSelectService.selectRecord(this.record);
    this.childModal.hide();
    location.reload();
  }

  selectDefault() {
    let defaultRecord = this.recordSelectService.getDefault();
    this.recordSelectService.selectRecord(defaultRecord);
    location.reload();
  }

}
