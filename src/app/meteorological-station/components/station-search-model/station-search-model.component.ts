import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormControl, FormGroup, UntypedFormGroup, ValidatorFn} from "@angular/forms";
import {chartService} from "../../../common/services/server-communication/chart.service";
import {MeteoDataService} from "../../../common/services/share-services/meteo-data/meteo-data.service";
import {dataFormat} from "../../model/model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-station-search-model',
  templateUrl: './station-search-model.component.html',
  styleUrls: ['./station-search-model.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class StationSearchModelComponent {
  searchForm: UntypedFormGroup = new FormGroup({
      calendar: new FormControl<dataFormat | string>("", [dateValidator(),temporaryValidator()]),
      stationNumber: new FormControl<string>('', {nonNullable: true}),
    },
  );

  constructor(private readonly activeModal: NgbActiveModal,
              private readonly thermoDataService: MeteoDataService,
              private readonly diagramService: chartService,
              private readonly router: Router,
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
      this.router.navigate(['/']);
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
function temporaryValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value) return null;
    const searchForm = control.parent;
    const errors: boolean = searchForm?.get('calendar')?.errors?.[
      'notValidDate'
      ] as boolean;
    if (errors) return null;
    const parsedDate = new Date()
    const temporaryDate = new Date(2023,0,31)
    const {year, month, day} = control.value;
    parsedDate.setFullYear(year, month - 1, day)

    return temporaryDate > parsedDate
      ? null : {notValidServerDate: true};
  };
}
