import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {DiagramService} from "../../../diagram-chart/services/diagram.service";
import {properties} from "../../../diagram-chart/modal/modal";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {StationSearchModelComponent} from "../../../stationManager/station-search-model/station-search-model.component";
import {ThermodataService} from "../../services/share-services/thermodata/thermodata.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  dataProperties?:properties

  constructor(private readonly diagramService: DiagramService,
              private readonly thermoService:ThermodataService,
              public readonly modalService: NgbModal) { }


  ngOnInit(): void {
     this.thermoService.stationData$.subscribe(x=>this.dataProperties =x)
  }


  getDataFromStation(){
    return new Date(Number(this.dataProperties?.arrived)*1000).toUTCString()
  }

  getStationName() {
    return this.dataProperties?.gts_topic.split('/')[1].toUpperCase() +' ' + this.dataProperties?.station_id
  }

  openModal() {
    const modalRef = this.modalService.open(StationSearchModelComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
}
