export class Sentiment {
    private _positiveness: number;
    constructor(positiveness: number) {
        this._positiveness = positiveness;
    };

    get Positiveness(): number {
        return this._positiveness * 100;
    }
}
