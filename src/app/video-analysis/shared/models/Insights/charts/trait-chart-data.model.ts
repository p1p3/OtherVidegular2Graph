import { ChartBarWithLineOptions } from './../../../../../charts/chartJs/BarWithLine.chartjs';
import { Trait } from './../trait.model';

export abstract class TraitChartData {

    public chartLabels: Array<string>;
    public label: string;
    public data: Array<number>;
    public trait: Trait;

    constructor(trait: Trait) {
        this.data = Array<number>();
        this.chartLabels = Array<string>();
        this.label = trait.name;
        this.trait = trait;
    }

    protected getPercentage(value: number) {
        return value * 100;
    }

    abstract getChartBarWithLineOptions(color?: string): ChartBarWithLineOptions;
}
