import {Component, OnInit} from '@angular/core';
import {ThermodataService} from "../../../../common/services/share-services/thermodata/thermodata.service";
import {map, Observable} from "rxjs";
import {observationData, pointTO} from "../../../../diagram-chart/modal/modal";


@Component({
  selector: 'app-thermodata',
  templateUrl: './thermodata.component.html',
  styleUrls: ['./thermodata.component.scss']
})
export class ThermodataComponent implements OnInit {
  pageSize = 20;
  page = 4;
  dataFromChart$: Observable<observationData[]> = this.thermoDataService.thermoData$.pipe(map(x => x.dataFromUniversity))


  constructor(private readonly thermoDataService: ThermodataService) {
  }

  ngOnInit(): void {

  }

}
