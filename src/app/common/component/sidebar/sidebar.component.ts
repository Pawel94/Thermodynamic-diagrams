import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MeteoDataService} from "../../services/share-services/meteo-data/meteo-data.service";
import {properties} from "../../services/share-services/model/modelDataFromServer";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChartViewService} from "../../services/share-services/chart-view/chart-view.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ZoomChartService} from "../../services/share-services/zoom-chart/zoom-chart.service";
import {LoaderService} from "../../services/load-service/load-service";
import {combineLatest, map} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('menuOptionsBackground', [
      state('DEFAULT', style({backgroundColor: 'transparent'})),
      state('ACTIVE', style({backgroundColor: '#93C5FE'})),
      transition('* => *', animate('0.3s ease-in-out')),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  chartOption$?: string
  dataProperties?: properties
  zoomFlag: boolean = false;
  loader$ = this.loaderService.isLoading;
  sidebarInfo$ = combineLatest([this.thermoService.stationData$, this.chartViewDataService.actualChartName$]).pipe(map(([stationData, chartName]) => {
    this.dataProperties = stationData;
    this.chartOption$ = chartName
  }))


  constructor(private readonly thermoService: MeteoDataService,
              private readonly chartViewDataService: ChartViewService,
              public readonly modalService: NgbModal,
              private readonly zoomService: ZoomChartService,
              public readonly loaderService: LoaderService,) {
  }

  ngOnInit(): void {
  }

  getDataFromStation() {
    return new Date(Number(this.dataProperties?.arrived) * 1000).toUTCString()
  }

  getStationName() {
    return this.dataProperties?.gts_topic?.split('/')[1].toUpperCase() + ' ' + this.dataProperties?.station_id
  }

  setView(view: string) {
    this.chartViewDataService.setActualViewChart(view)
  }

  openModal() {
    import("../../../meteorological-station/components/station-search-model/station-search-model.component").then(
      (m) => this.modalService.open(m.StationSearchModelComponent)
    );
  }

  openInfoModal() {
    import("../info-modal/info-modal.component").then(
      (m) => this.modalService.open(m.InfoModalComponent)
    );
  }

  activateZoomingChart() {
    this.zoomFlag = !this.zoomFlag
    this.zoomService.setZoomChartState(this.zoomFlag);
  }

  isViewSkewT() {
    return this.chartOption$ === "SkewT"
  }

  isViewEmagram() {
    return this.chartOption$ === "Emagram"
  }
}
