import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
const Draggable = require("highcharts/modules/draggable-points.js");
Draggable(Highcharts);
const Exporting = require("highcharts/modules/exporting.js");
Exporting(Highcharts);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Highcharts: typeof Highcharts = Highcharts;
  linechart: any = {
    series: [
      {
        data: [1, 2, 3],
      },
    ],
    plotOptions: {
      series: {
        stickyTracking: false,
        dragDrop: {
          draggableY: false,
          draggableX:true
        }
      },
      column: {
        stacking: "normal",
        minPointLength: 2
      },
      line: {
        cursor: "ns-resize"
      }
    },
    chart: {
      type: 'line',
    },
    title: {
      text: 'linechart',
    },
  };
}
