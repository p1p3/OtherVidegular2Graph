import { Trait } from './trait.model';

export class ChildTrait extends Trait {
    constructor(public id: string,
        public name: string,
        public category: string,
        public percentile: number) {
        super(id, name, category, percentile);
    }
}