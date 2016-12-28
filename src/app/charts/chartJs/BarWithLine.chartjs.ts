export interface ChartBarWithLineOptions extends BarChartOptions {
    lineAt?: LineAt;
    scales?:any;
}

export interface LineAt {
    value: number;
    color?: string;
    label?: string;
}
