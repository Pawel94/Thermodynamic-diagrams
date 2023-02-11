import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {
  chartAppearance,
  ChartAppearanceService
} from "../../../common/services/share-services/chart-apperance/chart-appearance.service";
import {debounceTime, distinctUntilChanged, first, tap} from "rxjs";

@Component({
  selector: 'app-chart-options',
  templateUrl: './chart-options.component.html',
  styleUrls: ['./chart-options.component.scss']
})
export class ChartOptionsComponent implements OnInit {
  chartOptionsForm = new UntypedFormGroup({
    dryAdiabaticFunctionColor: new UntypedFormControl(''),
    saturatedAdiabaticFunctionColor: new UntypedFormControl('')
  });
  loadedDefaultOptions$ = this.chartAppearance.chartAppearance$.pipe(
    first(),
    tap((options) => {
      this.chartOptionsForm.patchValue(options)
    })
  )

  constructor(private readonly chartAppearance: ChartAppearanceService) {
    this.chartOptionsForm.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(newValues => {
      this.chartAppearance.setChartAppearance(newValues as chartAppearance)
    })

  }

  ngOnInit(): void {

  }

  save() {

  }
}
