import { Insight } from './../../video-analysis/shared/models/Insights/insight.model';
import { TextAnalytics } from './../../video-analysis/shared/models/text-analytics/text-analytics.model';
import { IAnalyticsService } from './def/analytics.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'

export enum AssetRecordType {
  TimeMarker = 1,
  Emotion = 2,
  TextAnalytics = 3,
  FullText = 4,
  KeyPhrase = 5,
  Insights = 6,
  RawEmotions = 7
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

  private getRecordInformation(recordId: string, dataType: AssetRecordType): Observable<Response> {
    let headers = new Headers(this.TokenHeader);
    let options = { headers: headers };
    let getURL = this.AnalyticsURL + this.GetURI
      .replace(this.dataTypeInterpolation, dataType.toString())
      .replace(this.assetIdInterpolation, recordId);

    return this.http.get(getURL, options);
  }

  public getRecordEmotions(recordId: string): Observable<Response> {
    return this.getRecordInformation(recordId, AssetRecordType.Emotion);
  }

  getRecordTimeMarkers(recordId: string): Observable<Response> {
    return this.getRecordInformation(recordId, AssetRecordType.TimeMarker);
  }
  getRecordTextAnalytics(recordId: string): Observable<Response> {
    return this.getRecordInformation(recordId, AssetRecordType.TextAnalytics);
  }
  getRecordFullText(recordId: string): Observable<Response> {
    return this.getRecordInformation(recordId, AssetRecordType.FullText);
  }
  getRecordKeyPhrase(recordId: string): Observable<Response> {
    return this.getRecordInformation(recordId, AssetRecordType.KeyPhrase);
  }
  getRecordInsights(recordId: string): Observable<Response> {
    return this.getRecordInformation(recordId, AssetRecordType.Insights);
  }
  getRecordRawEmotions(recordId: string): Observable<Response> {
    return this.getRecordInformation(recordId, AssetRecordType.RawEmotions);
  }
}
