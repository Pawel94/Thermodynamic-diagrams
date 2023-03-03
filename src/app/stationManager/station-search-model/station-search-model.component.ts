import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormControl, FormGroup, UntypedFormGroup, ValidatorFn} from "@angular/forms";
import {DiagramService} from "../../diagram-chart/services/diagram.service";
import {ThermodataService} from "../../common/services/share-services/thermodata/thermodata.service";


export interface dataFormat {
  year: string,
  month: string,
  day: string
}


@Component({
  selector: 'app-station-search-model',
  templateUrl: './station-search-model.component.html',
  styleUrls: ['./station-search-model.component.scss'],
})
export class StationSearchModelComponent {
  searchForm: UntypedFormGroup = new FormGroup({
      calendar: new FormControl<dataFormat | string>("", [dateValidator()],),
      stationNumber: new FormControl<string>('', {nonNullable: true}),
    },
  );

  constructor(private readonly activeModal: NgbActiveModal,
              private readonly thermoDataService: ThermodataService,
              private readonly diagramService: DiagramService
  ) {
  }


  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  getDataFromStation() {
    const date: dataFormat = this.searchForm.get("calendar")?.value
    const station: string = this.searchForm.get("stationNumber")?.value
    this.diagramService.getNewData(date, station).subscribe(() => {
      this.closeModal()
    },)
  }

}

function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value) return null;
    const parsedDate = new Date()
    const {year, month, day} = control.value;
    parsedDate.setFullYear(year, month - 1, day)
    return Date.now() > parsedDate.getTime()
      ? null : {notValidDate: true};
  };
}
