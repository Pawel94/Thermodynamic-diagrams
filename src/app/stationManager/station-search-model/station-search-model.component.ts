import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {DiagramService} from "../../diagram-chart/services/diagram.service";
import {ThermodataService} from "../../common/services/share-services/thermodata/thermodata.service";

@Component({
  selector: 'app-station-search-model',
  templateUrl: './station-search-model.component.html',
  styleUrls: ['./station-search-model.component.scss'],
})
export class StationSearchModelComponent implements OnInit {
  searchForm: UntypedFormGroup = new UntypedFormGroup({
      calendar: new UntypedFormControl('',),
      stationNummer: new UntypedFormControl('',),
    },
  );

  constructor(private readonly activeModal: NgbActiveModal,
              private readonly thermoDataService: ThermodataService,
              private readonly diagramService: DiagramService
  ) {
    this.searchForm.valueChanges
      .subscribe(values => {
        let date = new Date();
        date.setFullYear(values.calendar.year, values.calendar.month, values.calendar.day)
      })
  }

  ngOnInit(): void {
  }


  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  getDataFromStation() {
    const date = this.searchForm.get("calendar")?.value
    const station = this.searchForm.get("stationNummer")?.value
    this.diagramService.getNewData(date, station).subscribe(dataToChart => {
        this.thermoDataService.setActualTermoData(dataToChart)
        this.closeModal()
      },)
  }
}
