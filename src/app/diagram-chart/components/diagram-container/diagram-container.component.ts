import {ChangeDetectionStrategy, Component} from '@angular/core';
import {combineLatest, map, Observable, tap} from "rxjs";
import {ThermodataService} from "../../../common/services/share-services/thermodata/thermodata.service";
import {DiagramService} from "../../services/diagram.service";
import * as Highcharts from "highcharts";
import {ChartViewService} from "../../../common/services/share-services/chart-view/chart-view.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {ZoomChartService} from "../../../common/services/share-services/zoom-chart/zoom-chart.service";
import {
  chartAppearance,
  ChartAppearanceService
} from "../../../common/services/share-services/chart-apperance/chart-appearance.service";
import {ActivatedRoute} from "@angular/router";

const Draggable = require("highcharts/modules/draggable-points.js");
Draggable(Highcharts);
const Exporting = require("highcharts/modules/exporting.js");
Exporting(Highcharts);

@Component({
  selector: 'app-diagram-container',
  templateUrl: './diagram-container.component.html',
  styleUrls: ['./diagram-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({opacity: 0}),
        animate(1500, style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate(200, style({opacity: 0}))
      ])
    ])
  ]

})
export class DiagramContainerComponent {
  mappedDataToDiagram$: Observable<any> = this.thermoDataService.mappedDataToDiagram$
  isZoomed: Observable<any> = this.zoom.zoomChartState$;
  mappedDataToSkewTDiagram$: Observable<any> = this.thermoDataService.mappedDataToSkewTDiagram$
  Highcharts: typeof Highcharts = Highcharts;
  chartView$: Observable<string> = this.chartViewDataService.actualChartName$.pipe(map(chartName => this.chartViewName = chartName))
  chartAppearance$: Observable<chartAppearance> = this.chartAppearance.chartAppearance$
  dataToDiagramChart$: Observable<any> = combineLatest([this.mappedDataToDiagram$, this.isZoomed, this.chartAppearance$])
  dataToSkewTChart$: Observable<any> = combineLatest([this.mappedDataToSkewTDiagram$, this.isZoomed, this.chartAppearance$])
  dataFromActivationRoute$: Observable<any> = this.activatedRoute.data.pipe(tap(dataToChart => this.thermoDataService.setActualTermoData(dataToChart['startUpData'])))

  private chartViewName?: string;

  constructor(private readonly thermoDataService: ThermodataService,
              private readonly chartViewDataService: ChartViewService,
              private readonly zoom: ZoomChartService,
              private readonly chartAppearance: ChartAppearanceService,
              private readonly activatedRoute: ActivatedRoute,
  ) {
  }


  updateDataFromChart($event: any) {
    console.log($event)
  }

  isViewEmagram() {
    return this.chartViewName === "Emagram"
  }
}
