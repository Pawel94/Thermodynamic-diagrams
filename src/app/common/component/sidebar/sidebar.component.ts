import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThermodataService} from "../../services/share-services/thermodata/thermodata.service";
import {properties} from "../../../diagram-chart/modal/modal";
import {StationSearchModelComponent} from "../../../stationManager/station-search-model/station-search-model.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InfoModalComponent} from "../info-modal/info-modal.component";
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


  constructor(private readonly thermoService: ThermodataService,
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
    const modalRef = this.modalService.open(StationSearchModelComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  openInfoModal() {
    const modalRef = this.modalService.open(InfoModalComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
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
