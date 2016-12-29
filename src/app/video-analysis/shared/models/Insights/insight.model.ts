import { ChildTrait } from './child-trait.model';
import { RootTrait } from './root-trait.model';

export class Insight {
    private _personality: Array<RootTrait>;
    private _needs: RootTrait;
    private _values: RootTrait;

    constructor() {
        this._personality = new Array<RootTrait>();
        this._needs = new RootTrait('Needs_Root', 'Needs', 'needs', -1);
        this._values = new RootTrait('Values_Root', 'Values', 'values', -1);
    }


    get personality(): Array<RootTrait> {
        return this._personality;
    }

    public addPersonalyTrait(trait: RootTrait) {
        this._personality.push(trait);
    }

    getPersonalityRootTraitById(id: string) {
        return this._personality.find(trait => trait.id === id);
    }

    get needs(): RootTrait {
        return this._needs;
    }

    public addNeedsTrait(trait: ChildTrait) {
        this._needs.addChildTrait(trait);
    }

    get values(): RootTrait {
        return this._values;
    }

    public addValuesTrait(trait: ChildTrait) {
        this._values.addChildTrait(trait);
    }

}