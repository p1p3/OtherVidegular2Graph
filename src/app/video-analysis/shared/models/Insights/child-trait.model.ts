import { ChildTraitChartData } from './charts/child-trait-chart.data.model';
import { Trait } from './trait.model';

export class ChildTrait extends Trait {
    constructor(public id: string,
        public name: string,
        public category: string,
        public percentile: number) {
        super(id, name, category, percentile);
    }

    public getChartData() {
        return new ChildTraitChartData(this);
    }
}