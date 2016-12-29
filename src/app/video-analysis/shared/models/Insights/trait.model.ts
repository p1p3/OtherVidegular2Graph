import { TraitChartData } from './charts/trait-chart-data.model';

export abstract class Trait {
    constructor(public id: string,
        public name: string,
        public category: string,
        public percentile: number) {
    }

    abstract getChartData(): TraitChartData
}