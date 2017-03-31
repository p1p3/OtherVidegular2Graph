import { Http, RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { VideoMetadata } from './video-metadata.model';
import { Observable } from 'rxjs/Rx';
import { ISubmitJobService } from './definitions/i-submit-job.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SubmitJobService implements ISubmitJobService {

  private AnalyticsURL = 'https://bsksimulationapi.azurewebsites.net/';
  private postURI = 'v1/submission/{assetId}';
  private assetIdInterpolation = '{assetId}';

  private APIKey = '744f8b379a6745089d540706d84c70e2';
  private TokenHeader = { 'Ocp-Apim-Subscription-Key': this.APIKey };

  constructor(private http: Http) { }

  public submitJob(assetId: string, videoMetadata: VideoMetadata): Observable<Response> {

    let headers = new Headers(this.TokenHeader);
    let options = new RequestOptions({ headers: headers });
    let params: URLSearchParams = new URLSearchParams();
    params.set('assetId', assetId);

    let URL = this.AnalyticsURL + this.postURI
      .replace(this.assetIdInterpolation, assetId);

    return this.http.post(URL, videoMetadata, options);
  }
}
