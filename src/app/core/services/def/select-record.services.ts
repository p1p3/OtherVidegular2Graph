import { RecordSelect } from './../../models/record-select.model';

export interface ISelectRecordService {
    readonly selectedRecord: RecordSelect;
    selectRecord(record: RecordSelect): void;
    getDefault(): RecordSelect;
}
