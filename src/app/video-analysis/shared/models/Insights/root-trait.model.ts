import { RootTraitChartData } from './charts/root-trait-chart-data.model';
import { ChildTrait } from './child-trait.model';
import { Trait } from './trait.model';

export class RootTrait extends Trait {
    private _traits: Array<ChildTrait>;

    constructor(public id: string,
        public name: string,
        public category: string,
        public percentile: number) {
        super(id, name, category, percentile);
        this._traits = new Array<ChildTrait>();
    }

    get traits(): Array<ChildTrait> {
        return this._traits;
    }

    public addChildTrait(trait: ChildTrait) {
        this._traits.push(trait);
    }

    public getChildrensById(id: string) {
        return this._traits.filter(trait => trait.id === id);
    }

    public getChartData() {
        return new RootTraitChartData(this);
    }

}
