import { LinearGaugeRange } from './linear-gauge-range.model';

export class LinearGaugeOptions {
    private _maxValue: number;
    private _minValue: number;
    private _ranges: Array<LinearGaugeRange>;
    private _startValue: number;

    constructor(minValue: number, maxValue: number, startValue: number = 0) {
        this._maxValue = maxValue;
        this._minValue = minValue;
        this._startValue = startValue;
        this._ranges = new Array<LinearGaugeRange>();
    }

    get startValue() {
        return this._startValue;
    }

    get ranges() {
        return this._ranges;
    }

    public rangePercentage(range: LinearGaugeRange) {
        return 100*(range.interval / this._maxValue);
    }

    public addRange(startPoint: number, endPoint: number, color: string) {
        if (this.outOfRange(startPoint)) {
            throw new Error(this.getOutOfRangeErrorMessage('Start', startPoint));
        }

        if (this.outOfRange(endPoint)) {
            throw new Error(this.getOutOfRangeErrorMessage('End', endPoint));
        }

        this._ranges.push(new LinearGaugeRange(startPoint, endPoint, color));
        this._ranges.sort((a, b) => a.startPoint - b.startPoint);
    }

    private outOfRange(value: number) {
        return value > this._maxValue || value < this._minValue;
    }

    private getOutOfRangeErrorMessage(position: string, value: number): string {
        return `${position} point is not in the limits ${value},
                             max limit ${this._maxValue}, min limit ${this._minValue} `
    }
}


