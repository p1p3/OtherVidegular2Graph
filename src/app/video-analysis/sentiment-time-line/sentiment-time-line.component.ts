import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sentiment-time-line',
  templateUrl: './sentiment-time-line.component.html',
  styleUrls: ['./sentiment-time-line.component.css']
})
export class SentimentTimeLineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartType: string = 'line';

  /* addData() {
       let _lineChartData: Array<any> = new Array(this.lineChartData.length);
       for (let dataset of this.lineChartData) {
           dataset.push(Math.random() * 100);
       }
   }*/


  public addData(data: ChartDataSet): void {
    //debugger;
    this.lineChartLabels.push('new');
    let _lineChartData = Array<any>();
    for (let dataSet of this.lineChartData) {
      let copy = Object.assign({ __proto__: dataSet.__proto__ }, dataSet);
      copy.data.push(Math.floor((Math.random() * 100) + 1));
      _lineChartData.push(copy);
      //dataSet.data.push(Math.floor((Math.random() * 100) + 1));
    }
    /* for (let i = 0; i < this.lineChartData.length; i++) {
         _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
         for (let j = 0; j < this.lineChartData[i].data.length; j++) {
             _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
         }
     }*/
    this.lineChartData = _lineChartData;
  }

  public _addData(): void {
    //debugger;
    this.lineChartLabels.push('new');
    let _lineChartData = Array<any>();
    for (let dataSet of this.lineChartData) {
      let copy = Object.assign({ __proto__: dataSet.__proto__ }, dataSet);
      copy.data.push(Math.floor((Math.random() * 100) + 1));
      _lineChartData.push(copy);
      //dataSet.data.push(Math.floor((Math.random() * 100) + 1));
    }
    /* for (let i = 0; i < this.lineChartData.length; i++) {
         _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
         for (let j = 0; j < this.lineChartData[i].data.length; j++) {
             _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
         }
     }*/
    this.lineChartData = _lineChartData;
  }
}
