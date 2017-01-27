export abstract class TickMarker {
    protected constructor(public startTick: number,
        public endTick: number,
        public timeScale: number) {
    }

    get startTimeInSeconds() {
        return this.startTick / this.timeScale;
    }

    get endTimeInSeconds() {
        return this.endTick / this.timeScale;
    }
    get formatedHmsStartTime() {
        return this.secondsToHms(this.startTimeInSeconds);
    }

    get formatedHmsEndTime() {
        return this.secondsToHms(this.endTimeInSeconds);
    }

    private secondsToHms(d: number) {
        d = Number(d);
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);

        let hDisplay = (h > 0 ? this.formatToNN(h) : '00') + ':';
        let mDisplay = (m > 0 ? this.formatToNN(m) : '00') + ':';
        let sDisplay = (s > 0 ? this.formatToNN(s) : '00');
        return hDisplay + mDisplay + sDisplay;
    }

    private formatToNN(d: number) {
        return d >= 10 ? d : `0${d} `;
    }
}