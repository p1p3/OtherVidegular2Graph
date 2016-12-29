import { ChildTrait } from './../child-trait.model';
import { ChartBarWithLineOptions } from './../../../../../charts/chartJs/BarWithLine.chartjs';
import { TraitChartData } from './trait-chart-data.model';

export class ChildTraitChartData extends TraitChartData {
    constructor(trait: ChildTrait) {
        super(trait);
        this.data.push(super.getPercentage(trait.percentile));
        this.chartLabels.push(trait.name);
    }
    public getChartBarWithLineOptions(color?: string): ChartBarWithLineOptions {
        return {};
    }
}
