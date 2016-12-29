import { ChartBarWithLineOptions } from './../../../../../charts/chartJs/BarWithLine.chartjs';
import { RootTrait } from './../root-trait.model';
import { TraitChartData } from './trait-chart-data.model';

export class RootTraitChartData extends TraitChartData {
    constructor(trait: RootTrait) {
        super(trait);
        for (let childTrait of trait.traits) {
            this.data.push(super.getPercentage(childTrait.percentile));
            this.chartLabels.push(childTrait.name);
        }
    }
    public getChartBarWithLineOptions(color?: string): ChartBarWithLineOptions {
        if (this.trait.percentile >= 0) {
            return { lineAt: { value: this.getPercentage(this.trait.percentile), color: color, label: this.label } };
        } else {
            return {};
        }
    }
}
