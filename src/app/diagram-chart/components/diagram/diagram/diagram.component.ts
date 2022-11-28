import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as Highcharts from 'highcharts';
import {
  generateDryAdiabatFunction,
  generateMoistAdiabaticEmagramLine,
  generateSaturationMixingRatioLine,
} from "../../../../common/utils";
import {Observable} from "rxjs";
import {helperLines, pointTO} from "../../../modal/modal";
import {ThermodataService} from "../../../../common/services/share-services/thermodata/thermodata.service";


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
  updateFlag = false;
  @Input() chartData$?: Observable<any>;
  @Output() newChartData = new EventEmitter<any>();
  rage: number[] = [1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100]
  actualObservationTemperature?: pointTO[]
  actualObservationDewTemperature?: pointTO[]
  coreData?: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions?: Highcharts.Options;
  linechart: any;


  ngOnInit(): void {
    this.chartData$?.subscribe(x => {
        this.actualObservationTemperature = x.mappedDataToChart.listOfPointsTemperature
        this.actualObservationDewTemperature = x.mappedDataToChart.listOfPointsDewTemperature
        this.coreData = x.toChart
        this.initChart()
        this.drawFunction()
        this.addDryAdiabatsLines()
        this.generateSaturationMixingRatioLines();
        this.addMoistAdiabatsLines()
      }
    )

  }

  constructor(private readonly thermoService: ThermodataService) {

  }


  private addDryAdiabatsLines() {
    let dryAdiobatsSerie = this.generateLineOnChart("Dry adiobat", '#cb0e3a');
    this.linechart.series.push(dryAdiobatsSerie)

    for (let i = -80; i < 150; i += 10) {
      let dryAdiobatsSeries = this.generateLineOnChart('Ratio', '#cb0e3a',
        generateDryAdiabatFunction(i), ':previous')
      this.linechart.series.push(dryAdiobatsSeries)
    }
  }


  private addMoistAdiabatsLines() {

    let obj = this.generateLineOnChart('Moist adiabatic', '#2f7ed8')
    this.linechart.series.push(obj)

    for (let i = -80; i < 60; i += 10) {
      let obj = this.generateLineOnChart('Moist adiabatic', '#2f7ed8',
        generateMoistAdiabaticEmagramLine(this.rage, i), ':previous')
      this.linechart.series.push(obj)
    }
  }

  private generateSaturationMixingRatioLines() {

    let ratio = [1, 2, 3, 4, 6, 8, 10, 15, 20, 30, 40, 60, 80, 100]
    let result: any = []
    ratio.forEach(x => {
      let saturationMixingRatioLine = generateSaturationMixingRatioLine(this.rage, x);
      result.push(saturationMixingRatioLine)
    })

    let obj = this.generateLineOnChart('Ratio', '#40d82f')
    this.linechart.series.push(obj)

    result.forEach((x: any) => {
      let obj = this.generateLineOnChart('Ratio', '#40d82f',
        x, ':previous')
      this.linechart.series.push(obj)
    })

  }

  detectClick() {
    this.linechart.series.forEach((x: any) => {
      if (x.name === "Thermo data") {
        this.newChartData.emit({points: x, coreData:this.coreData})
      }
    })
  }


  drawFunction() {
    const chartObject = {
      color: '#e56610',
      type: 'line',
      data: this.actualObservationTemperature,
      pointStart: 900,
      pointInterval: 1550123,
      zIndex: 1,
      lineWidth: 6,
      dragDrop: {
        draggableY: false,
        draggableX: true
      },
      name: 'Thermo data'
    };
    this.drawNormalFunction(chartObject)
    this.drawMoistFunction(chartObject)
    this.updateFlag = true;
  }

  drawNormalFunction(chartObject: any) {
    this.linechart.series[0] = chartObject
  }

  drawMoistFunction(chartObject: any) {
    const newChart = {...chartObject}
    newChart.color = '#104ce5';
    newChart.data = this.actualObservationDewTemperature
    newChart.name = 'Dew point function';
    this.linechart.series[1] = newChart
  }

  initChart() {
    this.linechart = {
      subtitle: {
        text: 'Emagram Chart',
        align: 'left'
      },
      series: [{
        point: {},
        color: '#e56610',
        name: 'Thermo data',
      }],

      xAxis: {
        gridLineWidth: 1,
        tickInterval: 5,
        plotLines: [{
          color: 'red',
          dashStyle: 'longdashdot',
          value: 0,
          width: 2,
          shadow: true
        }],
        title: {
          text: 'Temperature',
        },
        min: -80,
        max: 80
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
        type: 'logarithmic',
        reversed: true,
        min: 100,
        max: 900

      },
      plotOptions: {
        states: {
          hover: {enabled: false}
        },
        series: {},
        column: {
          stacking: "normal",
          minPointLength: 2
        },
        line: {}
      },
      chart: {
        type: 'line',
      },
      title: {
        text: 'Upper air sounding chart',
      },
    };
  }

  private generateLineOnChart(name: string, color: string, data?: any, linkedTo?: string) {
    let lineObject = new helperLines
    lineObject.name = name
    lineObject.color = color
    lineObject.data = data
    lineObject.linkedTo = linkedTo
    return lineObject
  }
}
