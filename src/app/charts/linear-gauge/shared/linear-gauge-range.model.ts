export class LinearGaugeRange {
    private _startPoint: number;
    private _endPoint: number;
    private _color: string;
    constructor(startPoint: number, endPoint: number, color: string) {
        this._startPoint = startPoint;
        this._endPoint = endPoint;
        this._color = color;
    }

    get endPoint() {
        return this._endPoint;
    }

    get startPoint() {
        return this._startPoint;
    }

    get color() {
        return this._color;
    }

    get interval(){
        return this.endPoint -this.startPoint;
    }


}
