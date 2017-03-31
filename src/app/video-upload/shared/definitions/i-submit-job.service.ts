import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { VideoMetadata } from './../video-metadata.model';

export interface ISubmitJobService {
    submitJob(assetId: string, videoMetadata: VideoMetadata): Observable<Response>;
}
