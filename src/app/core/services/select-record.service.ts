import { RecordSelect } from './../models/record-select.model';
import { ISelectRecordService } from './def/select-record.services';
import { Injectable } from '@angular/core';

@Injectable()
export class SelectRecordService implements ISelectRecordService {
  private recordStorageKey = 'record';
  private recordInMemory: RecordSelect;
  constructor() { }

  get selectedRecord(): RecordSelect {
    if (this.recordInMemory) { return this.recordInMemory; }

    let savedRecord = localStorage.getItem(this.recordStorageKey);
    if (savedRecord) {
      this.recordInMemory = JSON.parse(savedRecord) as RecordSelect;
    } else {
      this.recordInMemory = this.getDefault();
    }
    return this.recordInMemory;
  }

  public selectRecord(record: RecordSelect): void {
    this.recordInMemory = record;
    localStorage.setItem(this.recordStorageKey, JSON.stringify(record));
    
  }

  public getDefault(): RecordSelect {
    return new RecordSelect('c2365e78-a30c-49d8-bd62-439fef02df67',
      'http://bskamsdev.streaming.mediaservices.windows.net/e066b911-e10d-4173-a96a-eb3db4a48a39/Justin%20Hill%20Coaching%20Demo%202_960x540_1500.mp4'
      , true);
  }

}


 // {
      //   src: 'http://bskamsdev.streaming.mediaservices.windows.net/2d295f86-ce23-4f18-b6f4-4b694b7ee601/s12240135_428x240_428.mp4',
      //   type: 'video/mp4'
      // },


      //0cfffe55-d725-45a7-8bed-a322f1caa303
      // {
      //   src: 'http://bskamsdev.streaming.mediaservices.windows.net/0b51898e-1a24-4b6c-b1aa-25efac642072/Nat_1920x1080_6750.mp4',
      //   type: 'video/mp4'
      // },
      //cad2b5fc-7870-4694-8aa3-d4cc7f68470d
      // {
      //   src: 'http://bskamsdev.streaming.mediaservices.windows.net/85c8f6eb-8c8b-49ef-a3f4-5a5d3675c2fe/WIN_20170112_19_17_16_Pro_960x540_1500.mp4',
      //   type: 'video/mp4'
      // },
      //f0b40320-a73a-43d6-acd1-dadc4eb6f2d6
      // {
      //   src: 'http://bskamsdev.streaming.mediaservices.windows.net/5382e90b-84a7-44b0-8000-ba81d84a7cd2/Justin%20Hill%20Test%20Demo_640x360_1000.mp4',
      //   type: 'video/mp4'

      // }
      //c2365e78-a30c-49d8-bd62-439fef02df67
      // {
      //   src: 'http://bskamsdev.streaming.mediaservices.windows.net/e066b911-e10d-4173-a96a-eb3db4a48a39/Justin%20Hill%20Coaching%20Demo%202_960x540_1500.mp4',
      //   type: 'video/mp4'
      // },
      //87a4a843-a0d2-435f-9f62-bed4b54cc498
      // {
      //   src: 'http://bskamsdev.streaming.mediaservices.windows.net/fe446693-abb0-4c47-9722-4c6a2811f294/00005_1280x720_4500.mp4',
      //   type: 'video/mp4'
      // },
      //
      //03685a6c-37b1-453a-8aa8-cc62e4698074
      // {
      //   src: 'http://bskamsdev.streaming.mediaservices.windows.net/62e03eba-75e0-4632-ace6-a40e0ca3edcc/00008_1280x720_4500.mp4',
      //   type: 'video/mp4'
      // }