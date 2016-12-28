(function () {
    "use strict";

    // Store the original Draw function
    var originalLineDraw = Chart.controllers.bar.prototype.draw;
    // extend the new type
    Chart.helpers.extend(Chart.controllers.bar.prototype, {
      draw: function () {
        // use the base draw function
        originalLineDraw.apply(this, arguments);

        // get chart and context
        var chart = this.chart;
        var ctx = chart.chart.ctx;

        // get lineAt 
        var line = chart.options.lineAt;

        // stop if it doesn't exist
        if (typeof line === "undefined") {
          return;
        }

        var value = line.value;
        var color = line.color ? line.color : '#ff0000';
        var label = line.label ? line.label : '';

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
        ctx.textAlign = 'center';
        ctx.fillStyle = color;

        // draw label
        var middle = (xaxis.right - xaxis.left) / 2;
        ctx.fillText(label, middle, yaxis.getPixelForValue(value) + 20);
      }
    });

}).call(this);
/* Usage 

var myChart = new Chart(ctx, {
    type: 'bar',
    data: ,
    options: {lineAt:{value:,color:,label}}
});

*/
