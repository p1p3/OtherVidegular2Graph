import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'marker'
})

export class MarkerPipe implements PipeTransform {
    transform(value: string): string {
        let cleanMarker = this.removeGreater(value);
        cleanMarker = this.removeFractions(cleanMarker);
        return cleanMarker;
    }

    private removeGreater(value: string): string {
        return value.replace('>', '');
    }

    private removeFractions(value: string): string {
        return value.replace(/(\.[0-9])\w+/g, '');
    }
}