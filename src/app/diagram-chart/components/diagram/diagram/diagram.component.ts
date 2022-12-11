import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  generateDryAdiabatFunctionForEmagram,
  generateMoistAdiabaticEmagramLine,
  generateSaturationMixingRatioLine,
} from "../../../../common/utils";
import {Observable} from "rxjs";
import {AbstractDiagram} from "../../abstract-diagram/abstractDiagram";


@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent extends AbstractDiagram implements OnInit {
  updateFlag = false;
  @Input() mappedChartData$?: Observable<any>;
  @Input() mappedChartSkewTData$?: Observable<any>
  @Output() newChartData = new EventEmitter<any>();
  rage2: number[] = [1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100]

  coreData?: any;
  @Input() HighChart: any
  emagramChart: any


  ngOnInit(): void {
    this.mappedChartData$?.subscribe(chartData => {
        this.actualObservationTemperature = chartData.listOfPointsTemperature
        this.actualObservationDewTemperature = chartData.listOfPointsDewTemperature
        this.initChart()
        this.drawFunction()
        this.addDryAdiabatsLines()
        this.generateSaturationMixingRatioLines();
        this.addMoistAdiabatsLines()
      }
    )

  }

  constructor() {
    super()
  }


  private addDryAdiabatsLines() {
    let dryAdiobatsSerie = this.generateLineOnChart("Dry adiobat", '#cb0e3a');
    this.emagramChart.series.push(dryAdiobatsSerie)

    for (let i = -80; i < 150; i += 10) {
      let dryAdiobatsSeries = this.generateLineOnChart('Ratio', '#cb0e3a',
        generateDryAdiabatFunctionForEmagram(i), ':previous')
      this.emagramChart.series.push(dryAdiobatsSeries)
    }
  }


  private addMoistAdiabatsLines() {

    let obj = this.generateLineOnChart('Moist adiabatic', '#2f7ed8')
    this.emagramChart.series.push(obj)

    for (let i = -80; i < 60; i += 10) {
      let obj = this.generateLineOnChart('Moist adiabatic', '#2f7ed8',
        generateMoistAdiabaticEmagramLine(this.rage2, i), ':previous')
      this.emagramChart.series.push(obj)
    }
  }

  private generateSaturationMixingRatioLines() {

    let ratio = [1, 2, 3, 4, 6, 8, 10, 15, 20, 30, 40, 60, 80, 100]
    let result: any = []
    ratio.forEach(x => {
      let saturationMixingRatioLine = generateSaturationMixingRatioLine(this.rage2, x);
      result.push(saturationMixingRatioLine)
    })

    let obj = this.generateLineOnChart('Ratio', '#40d82f')
    this.emagramChart.series.push(obj)

    result.forEach((x: any) => {
      let obj = this.generateLineOnChart('Ratio', '#40d82f',
        x, ':previous')
      this.emagramChart.series.push(obj)
    })

  }

  detectClick() {
    this.emagramChart.series.forEach((x: any) => {
      if (x.name === "Thermo data") {
        this.newChartData.emit({points: x, coreData: this.coreData})
      }
    })
  }


  drawFunction() {
    this.drawNormalFunction()
    this.drawMoistFunction()
    this.updateFlag = true;
  }

  drawNormalFunction() {
    const chartObject = this.getThermoChartModel(this.actualObservationTemperature)
    this.emagramChart.series[0] = chartObject
  }

  drawMoistFunction() {
    const newChart = this.getMoistAdiabatChartModel(this.actualObservationDewTemperature)
    this.emagramChart.series[1] = newChart
  }

  initChart() {
    this.emagramChart = this.getChart("Emagram")
  }


}
