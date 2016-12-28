
// Sets the default config for 'myType' to be the same as the bubble defaults. 
// We look for the defaults by doing Chart.defaults[chartType]
// It looks like a bug exists when the defaults don't exist
Chart.defaults.BarWithLine = Chart.defaults.bar;

// I think the recommend using Chart.controllers.bubble.extend({ extensions here });
var custom = Chart.DatasetController.extend(Chart.controllers.bar.prototype);

// Overwrites the `linkScales` method. I don't think this is necessary and could cause problems
custom.linkScales = Chart.helpers.noop;

// Stores the controller so that the chart initialization routine can look it up with
// Chart.controllers[type]
Chart.controllers.myType = custom;

/***************** */
var baseController = Chart.controllers.bar;
Chart.defaults.barWithLine = Chart.defaults.bar;

Chart.controllers.barWithLine = Chart.controllers.bar.extend({
  draw: function (ease) {
    baseController.prototype.draw.apply(this, arguments);

    // Draw other stuff here.
    var point = this.datasets[0].bars[this.options.lineAtIndex];
    var scale = this.scale;
    var color = this.options.lineColor ? this.options.lineColor : '#ff0000';
    var label = this.options.lineLabel ? this.options.lineLabel : '';

    // draw line
    this.chart.ctx.beginPath();
    this.chart.ctx.moveTo(scale.startPoint + 12, point.y);
    this.chart.ctx.strokeStyle = color;
    this.chart.ctx.lineTo(this.chart.width, point.y);
    this.chart.ctx.stroke();

    // write TODAY
    this.chart.ctx.textAlign = 'center';
    this.chart.ctx.fillText(label, scale.startPoint + 35, point.y + 10);
  }
});


