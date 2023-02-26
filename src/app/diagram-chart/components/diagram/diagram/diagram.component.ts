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
    combineLatest([this.mappedChartData$, this.isZoom, this.chartAppearance$]).subscribe(([chartData, zoom, chartAppearance]: any) => {
        this.zoomFlag = zoom;
        this.chartAppearance = chartAppearance
        this.actualObservationTemperature = chartData?.listOfPointsTemperature
        this.actualObservationDewTemperature = chartData?.listOfPointsDewTemperature
        this.initChart()
        this.generateDryAdiabatsLines()
        this.generateSaturationMixingRatioLines();
        this.generateMoistAdiabatsLines()
        this.drawFunction()
      }
    );
  }

  constructor() {
    super()
  }


  private generateDryAdiabatsLines() {
    for (let i = -80; i < 150; i += 10) {
      let dryAdiobatsSeries = this.drawLineFunction(generateDryAdiabatFunctionForEmagram(i), this.chartAppearance!.dryAdiabaticFunctionAppearance)
      this.emagramChart.series.push(dryAdiobatsSeries)

    }
    console.log(this.emagramChart.series)
  }


  private generateMoistAdiabatsLines() {
    for (let i = -80; i < 60; i += 10) {
      let moistFunction = this.drawLineFunction(generateMoistAdiabaticEmagramLine(this.rage2, i), this.chartAppearance!.moistAdiabaticFunctionAppearance)
      this.emagramChart.series.push(moistFunction)
    }
  }

  private generateSaturationMixingRatioLines() {

    let ratio = [1, 2, 3, 4, 6, 8, 10, 15, 20, 30, 40, 60, 80, 100]
    let result: any = []
    ratio.forEach(x => {
      let saturationMixingRatioLine = generateSaturationMixingRatioLine(this.rage2, x);
      result.push(saturationMixingRatioLine)
    })

    result.forEach((x: any) => {
      let ratioChart = this.drawLineFunction(x, this.chartAppearance!.ratioFunctionAppearance)

      this.emagramChart.series.push(ratioChart)
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
    this.updateFlag = true;
  }

  drawNormalFunction() {
    const chartObject = this.drawLineFunction(this.actualObservationTemperature, this.chartAppearance.mainTemperature, this.zoomFlag)
    const newChart = this.drawLineFunction(this.actualObservationDewTemperature, this.chartAppearance.mainDewPoint, this.zoomFlag)
    this.emagramChart.series.push(chartObject, newChart)
  }


  initChart() {
    this.emagramChart = this.getChart("Emagram", this.chartAppearance)
  }


}
