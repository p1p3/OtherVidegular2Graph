import { ChildTrait } from './child-trait.mode';
import { Trait } from './trait.model';

export class RootTrait extends Trait {
    constructor(public id: string,
        public name: string,
        public category: string,
        public percentile: number,
        private traits: Array<ChildTrait>) {
        super(id, name, category, percentile);
    }
}