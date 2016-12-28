import { ChildTrait } from './child-trait.mode';
import { Trait } from './trait.model';

export class RootTrait extends Trait {
    private _traits: Array<ChildTrait>

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
}