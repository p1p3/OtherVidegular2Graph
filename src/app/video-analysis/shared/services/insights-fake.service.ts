import { Trait } from './../models/Insights/trait.model';
import { ChildTrait } from './../models/Insights/child-trait.mode';
import { RootTrait } from './../models/Insights/root-trait.model';
import { Http, Response } from '@angular/http';
import { Insight } from './../models/Insights/insight.model';

import { IInsightService } from './def/insights.service';
import { Injectable } from '@angular/core';
import { Observable, Operator } from 'rxjs/Rx';

@Injectable()
export class FakeInsightService implements IInsightService {
    constructor(private http: Http) { }
    public getRecordInsights(recordId: string): Observable<Insight> {
        return this.http.get('assets/mocks/insights.json')
            .map((res: Response) => {
                return this.mapJsonToInsight(res.json());
            });

    }

    private mapJsonToInsight(jsonResponse: any): Insight {
        let mappedInsight = new Insight();
        for (let jsonRootTrait of jsonResponse.personality) {
            mappedInsight.addPersonalyTrait(this.mapJsonToRootTrait(jsonRootTrait));
        }

        for (let jsonRootTrait of jsonResponse.values) {
            mappedInsight.addValuesTrait(this.mapJsonToRootTrait(jsonRootTrait));
        }

        for (let jsonRootTrait of jsonResponse.needs) {
            mappedInsight.addNeedsTrait(this.mapJsonToRootTrait(jsonRootTrait));
        }
        return mappedInsight;
    }


    private mapJsonToTrait(jsonResponse: any): Trait {
        let id = jsonResponse.trait_id;
        let name = jsonResponse.name;
        let category = jsonResponse.category;
        let percentile = jsonResponse.percentile;
        return new Trait(id, name, category, percentile);
    }

    private mapJsonToRootTrait(jsonResponse: any): RootTrait {
        let trait = this.mapJsonToTrait(jsonResponse);
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
        let trait = this.mapJsonToTrait(jsonResponse);
        return new ChildTrait(trait.id, trait.name, trait.category, trait.percentile);
    }
}
