import {Component, OnInit} from '@angular/core';
import {ThermodataService} from "../../../../common/services/share-services/thermodata/thermodata.service";
import {map, Observable} from "rxjs";
import {features, sharedObservationData} from "../../../../diagram-chart/modal/modal";


@Component({
  selector: 'app-thermodata',
  templateUrl: './thermodata.component.html',
  styleUrls: ['./thermodata.component.scss']
})
export class ThermodataComponent implements OnInit {
  pageSize = 20;
  page = 4;
  dataToTable: Observable<features[] | undefined> = this.thermoDataService.thermoData$.pipe(map(x => x.coreData?.features))


  constructor(private readonly thermoDataService: ThermodataService) {
  }

  ngOnInit(): void {

  }

}
