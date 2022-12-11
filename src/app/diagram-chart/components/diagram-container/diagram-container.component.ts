import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ThermodataService} from "../../../common/services/share-services/thermodata/thermodata.service";
import {DiagramService} from "../../services/diagram.service";
import * as Highcharts from "highcharts";
import {ChartViewService} from "../../../common/services/share-services/chart-view/chart-view.service";
import {animate, style, transition, trigger} from "@angular/animations";

const Draggable = require("highcharts/modules/draggable-points.js");
Draggable(Highcharts);
const Exporting = require("highcharts/modules/exporting.js");
Exporting(Highcharts);

@Component({
  selector: 'app-diagram-container',
  templateUrl: './diagram-container.component.html',
  styleUrls: ['./diagram-container.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1500, style({ opacity: 1}))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(200, style({ opacity: 0 }))
      ])
    ])
  ]

})
export class DiagramContainerComponent implements OnInit {
  mappedDataToDiagram$: Observable<any> = this.thermoDataService.mappedDataToDiagram$
  mappedDataToSkewTDiagram$: Observable<any> = this.thermoDataService.mappedDataToSkewTDiagram$
  Highcharts: typeof Highcharts = Highcharts;
  dataToChart$: Observable<any> = this.diagramService.getActualData()
  chartView$: Observable<string> = this.chartViewDataService.actualChartName$
  private chartViewName?: string;

  constructor(private readonly thermoDataService: ThermodataService,
              private readonly diagramService: DiagramService, private readonly chartViewDataService: ChartViewService) {
  }

  ngOnInit(): void {
    this.chartView$.subscribe(data => this.chartViewName = data)
    this.update()

  }

  updateDataFromChart($event: any) {
    console.log($event)
  }

  update() {
    this.dataToChart$
      .subscribe(dataToChart => {
        this.thermoDataService.setActualTermoData(dataToChart)
      })
  }

  destroy() {
  }

  isViewSkewT() {
    return this.chartViewName === "SkewT"
  }

  isViewEmagram() {
    return this.chartViewName === "Emagram"
  }
}
