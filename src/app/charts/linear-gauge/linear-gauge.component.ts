import { LinearGaugeRange } from './shared/linear-gauge-range.model';
import { Observable } from 'rxjs/Rx';
import { LinearGaugeOptions } from './shared/linear-gauge-options.model';
import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'

@Component({
    selector: 'graph-linear-gauge',
    template: `<div id="gauge">
                  <div id="bar" [style.height]="value + '%'" [style.background]="backgroundStyle"> 
                  </div>
                 
               </div>`,
    styleUrls: ['./linear-gauge.component.css']
})
export class linearGaugeComponent implements OnInit {
    @Input() valueSource: Observable<number>;
    @Input() options: LinearGaugeOptions;
    private value: number;
    private backgroundStyle: SafeStyle;
    private sanitizer: DomSanitizer;
    constructor(sanitizer: DomSanitizer) {
        this.sanitizer = sanitizer;
    }

    ngOnInit() {
        this.value = this.options.startValue;
        this.valueSource.subscribe(incomingValue => {
            this.value = incomingValue;
            this.setBackGroundColor();
        })
    }

    private setBackGroundColor() {
        let lastColor: string;
        for (let range of this.options.ranges) {
            if (this.value >= range.startPoint) {
                lastColor = range.color;
            }
        }

        this.backgroundStyle = this.transform(`${lastColor}`);
    }
    private setLinearGradient() {
        let colors: string = '';
        let totalColors = 0;
        let lastColor:string;

        for (let range of this.options.ranges) {
            if (this.value >= range.startPoint) {
                totalColors++;
                let percentage = Math.round(this.getActualPercentage(range));
                lastColor = range.color;
                let color = `,${lastColor} ${percentage}%`;
                colors += color
            }
        }

        if (totalColors > 1) {
            this.backgroundStyle = this.transform(`-webkit-linear-gradient(90deg ${colors})`);
        } else {
            this.backgroundStyle = this.transform(`${lastColor}`);
        }
        /* IF we want diferent colors
        //TODO: Fix for all
        this.backgroundStyle = this.transform(` 
             -moz-linear-gradient(top ${colors})
             -webkit-linear-gradient(top ${colors})
             linear-gradient(to bottom ${colors})`);*/
    }

    private getActualPercentage(range: LinearGaugeRange) {
        let normalizedRange = 0;
        if (this.value <= range.endPoint) {
            normalizedRange = this.value - range.startPoint;
        } else {
            normalizedRange = range.interval;
        }
        return 100 * (normalizedRange / this.value)
    }

    private transform(style: string): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle(style);
    }
}