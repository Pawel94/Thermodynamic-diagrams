import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  generateDryAdiabatFunctionForEmagram,
  generateMoistAdiabaticEmagramLine,
  generateSaturationMixingRatioLine,
} from "../../../../common/utils";
import {combineLatest, Observable} from "rxjs";
import {AbstractDiagram} from "../../abstract-diagram/abstractDiagram";
import {chartAppearance} from "../../../../common/services/share-services/chart-apperance/chart-appearance.service";


@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent extends AbstractDiagram implements OnInit {
  updateFlag = false;

  @Input() mappedChartData$?: Observable<any>;
  @Input() isZoom?: Observable<boolean>;
  @Input() mappedChartSkewTData$?: Observable<any>
  @Input() chartAppearance$!: Observable<chartAppearance>
  @Output() newChartData = new EventEmitter<any>();
  rage2: number[] = [1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100]

  coreData?: any;
  @Input() HighChart: any
  emagramChart: any


  ngOnInit(): void {
    combineLatest([this.mappedChartData$, this.isZoom, this.chartAppearance$]).subscribe((chartData: any) => {
        this.zoomFlag = chartData[1];
        this.chartAppearance = chartData[2]
        this.actualObservationTemperature = chartData[0]?.listOfPointsTemperature
        this.actualObservationDewTemperature = chartData[0]?.listOfPointsDewTemperature
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
    let dryAdiobatsSerie = this.generateLineOnChart("Dry adiobat", this.chartAppearance!.dryAdiabaticFunctionAppearance);
    this.emagramChart.series.push(dryAdiobatsSerie)

    for (let i = -80; i < 150; i += 10) {
      let dryAdiobatsSeries = this.generateLineOnChart('Ratio', this.chartAppearance!.dryAdiabaticFunctionAppearance,
        generateDryAdiabatFunctionForEmagram(i), ':previous')
      this.emagramChart.series.push(dryAdiobatsSeries)
    }
  }


  private addMoistAdiabatsLines() {

    let obj = this.generateLineOnChart('Moist adiabatic', this.chartAppearance.moistAdiabaticFunctionAppearance)
    this.emagramChart.series.push(obj)

    for (let i = -80; i < 60; i += 10) {
      let obj = this.generateLineOnChart('Moist adiabatic', this.chartAppearance.moistAdiabaticFunctionAppearance,
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

    let obj = this.generateLineOnChart('Ratio', this.chartAppearance.ratioFunctionAppearance)
    this.emagramChart.series.push(obj)

    result.forEach((x: any) => {
      let obj = this.generateLineOnChart('Ratio', this.chartAppearance.ratioFunctionAppearance,
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
    chartObject.dragDrop = {draggableY: false, draggableX: !this.zoomFlag};
    this.emagramChart.series[0] = chartObject
  }

  drawMoistFunction() {
    const newChart = this.getMoistAdiabatChartModel(this.actualObservationDewTemperature)
    newChart.dragDrop = {draggableY: false, draggableX: !this.zoomFlag};
    this.emagramChart.series[1] = newChart
  }

  initChart() {
    this.emagramChart = this.getChart("Emagram")
  }


}
