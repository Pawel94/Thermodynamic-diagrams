import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ThermodataService} from "../../../common/services/share-services/thermodata/thermodata.service";
import {DiagramService} from "../../services/diagram.service";

@Component({
  selector: 'app-diagram-container',
  templateUrl: './diagram-container.component.html',
  styleUrls: ['./diagram-container.component.scss']
})
export class DiagramContainerComponent implements OnInit {
  dataFromChart$: Observable<number[][]> = this.thermoDataService.thermoData$

  constructor(private readonly thermoDataService: ThermodataService, private readonly diagramService: DiagramService) {
  }

  ngOnInit(): void {
    this.update()
  }

  updateDataFromChart($event: any) {
    console.log($event)
    // const obj = {
    //   data: $event
    // } as chartOfPoints
    // this.thermoDataService.setDataForThermoChart(obj)
  }

  update() {
    this.diagramService.getDataFromServer().subscribe(result => {
      console.log(result);
      this.thermoDataService.setDataForThermoChart(result)
    })
  }

  destroy() {
    this.thermoDataService.setDataForThermoChart({data:{}})
  }
}
