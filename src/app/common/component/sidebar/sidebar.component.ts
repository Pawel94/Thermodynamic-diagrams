import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThermodataService} from "../../services/share-services/thermodata/thermodata.service";
import {properties} from "../../../diagram-chart/modal/modal";
import {StationSearchModelComponent} from "../../../stationManager/station-search-model/station-search-model.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InfoModalComponent} from "../info-modal/info-modal.component";
import {ChartViewService} from "../../services/share-services/chart-view/chart-view.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('menuOptionsBackground', [
      state('DEFAULT', style({ backgroundColor: 'transparent' })),
      state('ACTIVE', style({ backgroundColor: '#93C5FE' })),
      transition('* => *', animate('0.3s ease-in-out')),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  dataProperties?: properties

  constructor(private readonly thermoService: ThermodataService, private readonly chartViewDataService:ChartViewService,public readonly modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.thermoService.stationData$.subscribe(data => this.dataProperties = data)

  }

  getDataFromStation() {
    return new Date(Number(this.dataProperties?.arrived) * 1000).toUTCString()
  }

  getStationName() {
    return this.dataProperties?.gts_topic.split('/')[1].toUpperCase() + ' ' + this.dataProperties?.station_id
  }

  setView(view:string){
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
}
