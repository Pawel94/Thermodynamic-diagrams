import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {ThermodataService} from "../../../common/services/share-services/thermodata/thermodata.service";
import {DiagramService} from "../../services/diagram.service";
import {sharedObservationData} from "../../modal/modal";

@Component({
  selector: 'app-diagram-container',
  templateUrl: './diagram-container.component.html',
  styleUrls: ['./diagram-container.component.scss']
})
export class DiagramContainerComponent implements OnInit {
  dataFromChart$: Observable<sharedObservationData> = this.thermoDataService.thermoData$
  dataToChart$: Observable<any> = this.diagramService.getActualData()

  constructor(private readonly thermoDataService: ThermodataService,
              private readonly diagramService: DiagramService) {
  }

  ngOnInit(): void {
    this.update()

  }

  updateDataFromChart($event: any) {
    console.log($event)
  }

  update() {
    this.dataToChart$
      .subscribe(dataToChart => this.thermoDataService.setActualTermoData(dataToChart.mappedDataToChart))
  }

  destroy() {

  }
}
