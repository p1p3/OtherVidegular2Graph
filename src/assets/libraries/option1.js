var baseController = Chart.controllers.bar;
Chart.controllers.barWithLine = baseController.extend({
  initialize: function () {
    baseController.prototype.initialize.apply(this, arguments);
  },
  draw: function (ease) {
    baseController.prototype.draw.apply(this, arguments);


    // get chart and context
    var chart = this.chart;
    var ctx = chart.chart.ctx;

    // get lineAtValue value
    var value = chart.config.lineAtValue;

    // stop if it doesn't exist
    if (typeof value === "undefined") {
      return;
    }

    var color = this.options.lineColor ? this.options.lineColor : '#ff0000';
    var label = this.options.lineLabel ? this.options.lineLabel : '';

    // draw the line
    var xaxis = chart.scales['x-axis-0'];
    var yaxis = chart.scales['y-axis-0'];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(xaxis.left, yaxis.getPixelForValue(value));
    ctx.strokeStyle = color;
    ctx.lineTo(xaxis.right, yaxis.getPixelForValue(value));
    ctx.stroke();
    ctx.restore();
    

    // write TODAY
    this.chart.ctx.textAlign = 'center';
    this.chart.ctx.fillText(label, xaxis.left, yaxis.getPixelForValue(value) + 10);
  }
});

/* Usage 

// Now we can create a new instance of our chart, using the Chart.js API
new Chart(ctx, {
  // this is the string the constructor was registered at, ie Chart.controllers.MyType
  type: 'barWithLine',
  data: data,
  options: {},
  lineValueAt : 12
});


*/
