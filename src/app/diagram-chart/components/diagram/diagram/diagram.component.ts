import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
const Draggable = require("highcharts/modules/draggable-points.js");
Draggable(Highcharts);
const Exporting = require("highcharts/modules/exporting.js");
Exporting(Highcharts);
@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  linechart: any = {
    series: [
      {
        data: [[-5,100], [0,200], [10,300],[5,400]],
        pointInterval: 5
      },
    ],
    yAxis: {
      reversed: true,
      showFirstLabel: false,
      showLastLabel: true
    },
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

  ngOnInit(): void {
  }

}
