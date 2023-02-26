import {Component, Input, OnInit} from '@angular/core';
import {
  generateDryAdiabatFunctionForSkewT,
  generateMoistAdiabaticSkewTLine,
  generateThermoLines,
} from "../../../../common/utils";
import {combineLatest, Observable} from "rxjs";
import {AbstractDiagram} from "../../abstract-diagram/abstractDiagram";
import {chartAppearance} from "../../../../common/services/share-services/chart-apperance/chart-appearance.service";

@Component({
  selector: 'app-diagram-skew-t',
  templateUrl: './diagram-skew-t.component.html',
  styleUrls: ['./diagram-skew-t.component.scss']
})
export class DiagramSkewTComponent extends AbstractDiagram implements OnInit {

  @Input() HighChart: any
  @Input() mappedChartDataSkewT$?: Observable<any>;
  @Input() isZoom?: Observable<boolean>;
  @Input() chartAppearance$!: Observable<chartAppearance>
  updateFlag = false;

  constructor() {
    super();
  }

  skewT: any

  ngOnInit(): void {
    combineLatest([this.mappedChartDataSkewT$, this.isZoom, this.chartAppearance$]).subscribe(([chartData, zoom, chartAppearance]: any) => {
      this.zoomFlag = zoom;
      this.chartAppearance = chartAppearance
      this.actualObservationTemperature = chartData?.listOfPointsTemperature
      this.actualObservationDewTemperature = chartData?.listOfPointsDewTemperature
      this.initChart()
      this.generateIsotherms()
      this.generateDryAdiabatsLines()
      this.generateMoistAdiabatsLines()
      this.drawFunction()
    })
  }

  private generateMoistAdiabatsLines() {
    for (let i = -80; i < 90; i += 10) {
      let moistFunction = this.drawLineFunction(generateMoistAdiabaticSkewTLine(this.rage, i), this.chartAppearance!.moistAdiabaticFunctionAppearance)
      this.skewT.series.push(moistFunction)
    }

  }

  private generateIsotherms() {
    for (let i = -180; i < 150; i += 10) {
      let isotherms = this.drawLineFunction(generateThermoLines(i), this.chartAppearance!.temperatureFunction)
      this.skewT.series.push(isotherms)
    }

  }

  private initChart() {
    this.skewT = this.getChart("Skew-T Chart", this.chartAppearance)
  }

  drawFunction() {
    this.drawNormalFunction()
    this.drawMoistFunction()
    this.updateFlag = true;
  }

  drawNormalFunction() {
    const chartObject = this.drawLineFunction(this.actualObservationTemperature, this.chartAppearance.mainTemperature, this.zoomFlag)
    this.skewT.series.push(chartObject)
  }

  drawMoistFunction() {
    const newChart = this.drawLineFunction(this.actualObservationDewTemperature, this.chartAppearance.mainDewPoint, this.zoomFlag)
    this.skewT.series.push(newChart)
  }

  private generateDryAdiabatsLines() {
    for (let i = -80; i < 150; i += 10) {
      let dryAdiobatsSeries = this.drawLineFunction(generateDryAdiabatFunctionForSkewT(i), this.chartAppearance.dryAdiabaticFunctionAppearance)
      this.skewT.series.push(dryAdiobatsSeries)
    }
  }

}
