import { IAnalyticsService } from './def/analytics.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'

export enum AssetRecordType {
  TimeMarker = 1,
  Emotion = 2,
  TextAnalytics = 3,
  FullText = 4,
  KeyPhrase = 5
}

@Injectable()
export class AnalyticsService implements IAnalyticsService {
  private AnalyticsURL = 'https://bsksimulationapi.azurewebsites.net/';
  private GetURI = '/v1/analytics/datatype/{dataTypeId}/asset/{assetId}';
  private dataTypeInterpolation = '{dataTypeId}';
  private assetIdInterpolation = '{assetId}';

  private APIKey = '744f8b379a6745089d540706d84c70e2';

  private JsonHeader = { 'Content-Type': 'application/json' };
  private TokenHeader = { 'Ocp-Apim-Subscription-Key': this.APIKey };

  constructor(private http: Http) { }

  public getRecordEmotions(recordId: string): Observable<Response> {
    let headers = new Headers(this.TokenHeader);
    let options = { headers: headers};
    //let dataType =AssetRecordType.Emotion.toString();

    let dataType = '1';
    let getURL = this.AnalyticsURL + this.GetURI
      .replace(this.dataTypeInterpolation,dataType)
      .replace(this.assetIdInterpolation,recordId);

    return this.http.get(getURL,options);  
  }
}

