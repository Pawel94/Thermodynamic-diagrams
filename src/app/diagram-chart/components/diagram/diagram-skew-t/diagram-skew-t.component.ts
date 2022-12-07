import {Component, Input, OnInit} from '@angular/core';
import {
  generateDryAdiabatFunctionForSkewT,
  generateMoistAdiabaticSkewTLine,
  generateThermoLines,
} from "../../../../common/utils";
import {helperLines, pointTO} from "../../../modal/modal";
import {Observable} from "rxjs";

@Component({
  selector: 'app-diagram-skew-t',
  templateUrl: './diagram-skew-t.component.html',
  styleUrls: ['./diagram-skew-t.component.scss']
})
export class DiagramSkewTComponent implements OnInit {

  @Input() HighChart: any
  @Input() mappedChartDataSkewT$?: Observable<any>;
  updateFlag = false;
  actualObservationTemperature?: pointTO[]
  actualObservationDewTemperature?: pointTO[]
  rage: number[] = [1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100]

  constructor() {
  }

  skewT: any

  ngOnInit(): void {
    this.mappedChartDataSkewT$?.subscribe(chartData => {
      this.actualObservationTemperature = chartData.listOfPointsTemperature
      this.actualObservationDewTemperature = chartData.listOfPointsDewTemperature
      this.initChart()
      this.drawFunction()
      this.addThermoLines()
      this.addDryAdiabatsLines()
      this.addMoistAdiabatsLines()
    })
  }

  private addMoistAdiabatsLines() {

    let obj = this.generateLineOnChart('Moist adiabatic', '#2f7ed8')
    this.skewT.series.push(obj)
    for (let i = -84; i < 55; i += 10) {
      let obj = this.generateLineOnChart('Moist adiabatic', '#2f7ed8',
        generateMoistAdiabaticSkewTLine(this.rage, i), ':previous')
      this.skewT.series.push(obj)
    }
  }

  private addThermoLines() {
    let dryAdiobatsSerie = this.generateLineOnChart("Temperature", '#cb0e3a');
    this.skewT.series.push(dryAdiobatsSerie)

    for (let i = -180; i < 150; i += 10) {
      let dryAdiobatsSeries = this.generateLineOnChart('Temperature', '#cb0e3a',
        generateThermoLines(i), ':previous')
      this.skewT.series.push(dryAdiobatsSeries)
    }
  }

  private generateLineOnChart(name: string, color: string, data?: any, linkedTo?: string) {
    let lineObject = new helperLines
    lineObject.name = name
    lineObject.color = color
    lineObject.data = data
    lineObject.linkedTo = linkedTo
    return lineObject
  }

  private initChart() {
    this.skewT = {
      subtitle: {
        text: 'Skew-T Chart',
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

  drawFunction() {
    const chartObject = {
      color: '#e56610',
      type: 'scatter',
      marker: {
        enabled: false
      },
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
    this.skewT.series[0] = chartObject
  }

  drawMoistFunction(chartObject: any) {
    const newChart = {...chartObject}
    newChart.color = '#104ce5';
    newChart.data = this.actualObservationDewTemperature
    newChart.name = 'Dew point function';
    this.skewT.series[1] = newChart
  }

  private addDryAdiabatsLines() {
    let dryAdiobatsSerie = this.generateLineOnChart("Dry adiobat", '#21cb0e');
    this.skewT.series.push(dryAdiobatsSerie)

    for (let i = -80; i < 150; i += 10) {
      let dryAdiobatsSeries = this.generateLineOnChart('Ratio', '#21cb0e',
        generateDryAdiabatFunctionForSkewT(i), ':previous')
      this.skewT.series.push(dryAdiobatsSeries)
    }
  }

}
