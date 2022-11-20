import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {generateLinearFunction} from "../../../../common/utils";

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
    subtitle: {
      text: 'Paweł',
      align: 'left'
    },
    series: [
    ],

    xAxis: {
      gridLineWidth: 1,
      tickInterval: 5,
      plotLines: [{
        color: 'red', // Color value
        dashStyle: 'longdashdot', // Style of the plot line. Default to solid
        value: 0, // Value of where the line will appear
        width: 2, // Width of the line
        shadow: true
      }],
      title: {
        text: 'Temperature',
      },

    },
    yAxis: {
      labels: {
        format: '{value} hPa',
        style: {}
      },
      title: {
        text: 'Pressure ',
      },
      gridLineWidth: 1,
      reversed: true,
      showFirstLabel: false,
      showLastLabel: true,
      min: 100,
      max: 1000

    },
    plotOptions: {
      series: {
        stickyTracking: false,
        // dragDrop: {
        //   draggableY: false,
        //   draggableX:true
        // }
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

    this.addTermoChart()
  }
  constructor() {
    this.addHelpersLine()
  }


  private addTermoChart() {
    this.linechart.series.push({
      zIndex: 0,
      data: [[-5, 100], [0, 200], [10, 300], [5, 400], [-5, 500], [0, 600], [10, 700], [5, 800]],
      pointInterval: 5,
      lineWidth: 5,
      dragDrop: {
        draggableY: false,
        draggableX: true
      }
    },)
  }

  private addHelpersLine() {

    for (let i = 0; i < 16; i++) {
      const obj = {
        data: generateLinearFunction(12, 100 + i * 100),
        marker: {
          enabled: false
        },
        color: 'rgba(0,0,0,0.32)',
        dashStyle: 'longdash',
        linkedTo: 'X',
        lineWidth: 2,
      }
      this.linechart.series.push(obj)
    }
  }
}
