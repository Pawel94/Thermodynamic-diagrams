import {Component, Input, OnInit} from '@angular/core';
import {
  generateDryAdiabatFunctionForSkewT,
  generateMoistAdiabaticSkewTLine,
  generateThermoLines,
} from "../../../../common/utils";
import {combineLatest, Observable} from "rxjs";
import {AbstractDiagram} from "../../abstract-diagram/abstractDiagram";

@Component({
  selector: 'app-diagram-skew-t',
  templateUrl: './diagram-skew-t.component.html',
  styleUrls: ['./diagram-skew-t.component.scss']
})
export class DiagramSkewTComponent extends AbstractDiagram implements OnInit {

  @Input() HighChart: any
  @Input() mappedChartDataSkewT$?: Observable<any>;
  @Input() isZoom?: Observable<boolean>;
  updateFlag = false;

  constructor() {
    super();
  }

  skewT: any

  ngOnInit(): void {
    combineLatest([this.mappedChartDataSkewT$, this.isZoom]).subscribe((data: any) => {
      this.zoomFlag = data[1]
      this.actualObservationTemperature = data[0]?.listOfPointsTemperature
      this.actualObservationDewTemperature = data[0]?.listOfPointsDewTemperature
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
    for (let i = -80; i < 90; i += 10) {
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

  private initChart() {
    this.skewT = this.getChart("Skew-T Chart")
  }

  drawFunction() {
    this.drawNormalFunction()
    this.drawMoistFunction()
    this.updateFlag = true;
  }

  drawNormalFunction() {
    const chartObject = this.getThermoChartModel(this.actualObservationTemperature)
    chartObject.dragDrop = {draggableY: false, draggableX: !this.zoomFlag};
    this.skewT.series[0] = chartObject
  }

  drawMoistFunction() {
    const newChart = this.getMoistAdiabatChartModel(this.actualObservationDewTemperature)
    newChart.dragDrop = {draggableY: false, draggableX: !this.zoomFlag};
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