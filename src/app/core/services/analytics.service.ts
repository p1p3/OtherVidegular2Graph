import { Injectable } from '@angular/core';

@Injectable()
export class AnalyticsService {
  private AnalyticsURL = 'https://bsksimulationapi.azurewebsites.net/';
  private GetURI = '/v1/analytics/datatype/{dataTypeId}/asset/{assetId}';

  constructor() { }

  public get

}

export enum AssetRecordType {
    TimeMarker = 1,
    Emotion = 2,
    TextAnalytics = 3,
    FullText = 4,
    KeyPhrase = 5
}