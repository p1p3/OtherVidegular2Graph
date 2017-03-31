import { IAnalyticsService } from './../../../core/services/def/analytics.service';
import { Trait } from './../models/Insights/trait.model';
import { ChildTrait } from './../models/Insights/child-trait.model';
import { RootTrait } from './../models/Insights/root-trait.model';
import { Http, Response } from '@angular/http';
import { Insight } from './../models/Insights/insight.model';

import { IInsightService } from './def/insights.service';
import { Injectable, Inject } from '@angular/core';
import { Observable, Operator } from 'rxjs/Rx';

@Injectable()
export class InsightService implements IInsightService {
    constructor( @Inject('IAnalyticsService') private analyticsService: IAnalyticsService) { }
    public getRecordInsights(recordId: string): Observable<Insight> {
        return this.analyticsService.getRecordInsights(recordId)
            .map((res: Response) => this.mapJsonToInsight(res.json()));
    }

    private mapJsonToInsight(jsonResponse: any): Insight {
        let mappedInsight = new Insight();
        let jsonObject = JSON.parse(jsonResponse.Insights);

        for (let jsonRootTrait of jsonObject.personality) {
            mappedInsight.addPersonalyTrait(this.mapJsonToRootTrait(jsonRootTrait));
        }

        for (let jsonRootTrait of jsonObject.values) {
            mappedInsight.addValuesTrait(this.mapJsonToRootTrait(jsonRootTrait));
        }

        for (let jsonRootTrait of jsonObject.needs) {
            mappedInsight.addNeedsTrait(this.mapJsonToRootTrait(jsonRootTrait));
        }
        return mappedInsight;
    }


    private getRoot(jsonResponse: any): RootTrait {
        let id = jsonResponse.trait_id;
        let name = jsonResponse.name;
        let category = jsonResponse.category;
        let percentile = jsonResponse.percentile;
        return new RootTrait(id, name, category, percentile);
    }

    private getChild(jsonResponse: any): ChildTrait {
        let id = jsonResponse.trait_id;
        let name = jsonResponse.name;
        let category = jsonResponse.category;
        let percentile = jsonResponse.percentile;
        return new ChildTrait(id, name, category, percentile);
    }


    private mapJsonToRootTrait(jsonResponse: any): RootTrait {
        let trait = this.getRoot(jsonResponse);
        let rootTrait = new RootTrait(trait.id, trait.name, trait.category, trait.percentile);
        if (jsonResponse.children) {
            for (let children of jsonResponse.children) {
                let mappedChildren = this.mapJsonToChildTrait(children);
                rootTrait.addChildTrait(mappedChildren);
            }
        }

        return rootTrait;
    }

    private mapJsonToChildTrait(jsonResponse: any): ChildTrait {
        let trait = this.getChild(jsonResponse);
        return new ChildTrait(trait.id, trait.name, trait.category, trait.percentile);
    }
}
