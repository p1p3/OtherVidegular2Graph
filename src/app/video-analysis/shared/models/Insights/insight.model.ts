import { RootTrait } from './root-trait.model';

export class Insight {
    private _personality: Array<RootTrait>;
    private _needs: Array<RootTrait>;
    private _values: Array<RootTrait>;

    constructor() {
        this._personality = new Array<RootTrait>();
        this._needs = new Array<RootTrait>();
        this._values = new Array<RootTrait>();
    }

    get personality(): Array<RootTrait> {
        return this._personality;
    }

    public addPersonalyTrait(trait: RootTrait) {
        this._personality.push(trait);
    }

    get needs(): Array<RootTrait> {
        return this._needs;
    }

    public addNeedsTrait(trait: RootTrait) {
        this._needs.push(trait);
    }


    get values(): Array<RootTrait> {
        return this._values;
    }

    public addValuesTrait(trait: RootTrait) {
        this._values.push(trait);
    }


}