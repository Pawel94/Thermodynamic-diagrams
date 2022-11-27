import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts';
import {
  generateDryAdiabatFunction,
  generateMoistAdiabaticEmagramLine,
  generateSaturationMixingRatioLine,
} from "../../../../common/utils";
import {Observable} from "rxjs";
import {chartSerie} from "../../../modal/modal";
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
  chart: any;
  @Input() chartData$?: Observable<any>;
  @Output() newChartData = new EventEmitter<any>();
  rage: number[] = [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100]
  actualWeatherData?: any
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions?: Highcharts.Options;
  linechart: any;



  ngOnInit(): void {
    this.chartData$?.subscribe(x => {
      this.actualWeatherData = x.mappedDataToChart
      this.initChart()
      this.getActualData()
      this.addDryAdiabatsLines()
      this.generateSaturationMixingRatioLines();
      this.addMoistAdiabatsLines()

      }
    )

  }

  constructor(private readonly thermoService: ThermodataService) {

  }


  private addDryAdiabatsLines() {
    let dryAdiobatsSerie = {
      data: generateDryAdiabatFunction(-80),
      color: 'rgba(227,12,12,0.32)',
      enableMouseTracking: false,
      dashStyle: 'Dot',
      zIndex: 5,
      lineWidth: 1,
      name: 'dry adiobate',
    } as chartSerie

    this.linechart.series?.push(dryAdiobatsSerie)

    for (let i = -80; i < 150; i += 10) {
      let dryAdiobatsSeries = {
        data: generateDryAdiabatFunction(i),
        enableMouseTracking: false,
        marker: {
          enabled: false
        },
        color: 'rgba(227,12,12,0.32)',
        dashStyle: 'line',
        lineWidth: 2,
        zIndex: 5,
        linkedTo: ':previous',
      }
      this.linechart.series?.push(dryAdiobatsSeries)
    }
  }

  private addMoistAdiabatsLines() {
    let obj = {
      data: generateMoistAdiabaticEmagramLine(this.rage, -90),
      enableMouseTracking: false,
      marker: {
        enabled: false
      },
      color: '#2f7ed8',
      dashStyle: 'Dot',
      name: 'moist adiabatic',
      zIndex: 5,
      lineWidth: 2,
    }
    this.linechart.series.push(obj)
    for (let i = -80; i < 60; i += 10) {
      let obj = {
        data: generateMoistAdiabaticEmagramLine(this.rage, i),
        marker: {
          enabled: false
        },
        enableMouseTracking: false,
        color: '#2f7ed8',
        dashStyle: 'line',
        linkedTo: ':previous',
        lineWidth: 2,
        zIndex: 5,
        dataLabels: {
          enabled: false,
          crop: false,
          overflow: 'none',
          align: 'left',
          verticalAlign: 'middle',


        },
      }
      this.linechart.series.push(obj)
    }
  }

  private generateSaturationMixingRatioLines() {

    let ratio = [1,2, 3, 4, 6,8,10,15,20,30,40,60,80,100]
    let result: any = []
    ratio.forEach(x => {
      let saturationMixingRatioLine = generateSaturationMixingRatioLine(this.rage, x);
      result.push(saturationMixingRatioLine)
    })
    let obj = {
      data: generateSaturationMixingRatioLine(this.rage, 1),
      enableMouseTracking: false,
      marker: {
        enabled: false
      },
      color: '#40d82f',
      dashStyle: 'line',
      name: 'ratio',
      zIndex: 6,
      lineWidth: 2,
    }
    this.linechart.series.push(obj)

    result.forEach((x: any) => {
      let obj = {
        data: x,
        enableMouseTracking: false,
        marker: {
          enabled: false
        },
        color: '#40d82f',
        dashStyle: 'line',
        lineWidth: 2,
        id: 'ratio',
        zIndex: 6,
        linkedTo: ':previous'
      }

      this.linechart.series.push(obj)

    })

  }

  detectClick() {
    this.linechart.series.forEach((x: any) => {
      if (x.name === "Thermo data") {
        this.newChartData.emit(x.data)
      }
    })
  }


  getActualData() {
    console.log(this.linechart.series)
    this.linechart.series[0] = {
      color: '#e56610',
      type: 'line',
      data: this.actualWeatherData,
      pointInterval: 5,
      zIndex: 1,
      lineWidth: 6,
      dragDrop: {
        draggableY: false,
        draggableX: true
      },
      name: 'Thermo data'
    };
    this.updateFlag = true;
    console.log(this.linechart.series)
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
        // showFirstLabel: false,
        // showLastLabel: true,
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

}
