import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {
  chartAppearance,
  ChartAppearanceService
} from "../../../common/services/share-services/chart-apperance/chart-appearance.service";
import {debounceTime, distinctUntilChanged, first, tap} from "rxjs";
import {modalAppearance} from "../../../common/services/share-services/model/apperanceModel";


export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any>
    ? FormGroup<ControlsOf<T[K]>>
    : FormControl<T[K]>;
};

@Component({
  selector: 'app-chart-options',
  templateUrl: './chart-options.component.html',
  styleUrls: ['./chart-options.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChartOptionsComponent implements OnInit {

  chartOptionsForm = new FormGroup<ControlsOf<chartAppearance>>({
    dryAdiabaticFunctionAppearance: new FormGroup<ControlsOf<modalAppearance>>({
      name: new FormControl('', {nonNullable: true}),
      color: new FormControl('', {nonNullable: true}),
      lineWidth: new FormControl<number>(0, {nonNullable: true})
    }),
    ratioFunctionAppearance: new FormGroup<ControlsOf<modalAppearance>>({
      name: new FormControl('', {nonNullable: true}),
      color: new FormControl('', {nonNullable: true}),
      lineWidth: new FormControl<number>(0, {nonNullable: true})
    }),
    moistAdiabaticFunctionAppearance: new FormGroup<ControlsOf<modalAppearance>>({
      name: new FormControl('', {nonNullable: true}),
      color: new FormControl('', {nonNullable: true}),
      lineWidth: new FormControl<number>(0, {nonNullable: true})
    }),
    temperatureFunction: new FormGroup<ControlsOf<modalAppearance>>({
      name: new FormControl('', {nonNullable: true}),
      color: new FormControl('', {nonNullable: true}),
      lineWidth: new FormControl<number>(0, {nonNullable: true})
    }),
    mainTemperature: new FormGroup<ControlsOf<modalAppearance>>({
      name: new FormControl('', {nonNullable: true}),
      color: new FormControl('', {nonNullable: true}),
      lineWidth: new FormControl<number>(0, {nonNullable: true})
    }),
    mainDewPoint: new FormGroup<ControlsOf<modalAppearance>>({
      name: new FormControl('', {nonNullable: true}),
      color: new FormControl('', {nonNullable: true}),
      lineWidth: new FormControl<number>(0, {nonNullable: true})
    }),
  });
  listOfPropertiesToEdit: string[] = [];
  loadedDefaultOptions$ = this.chartAppearance.chartAppearance$.pipe(
    first(),
    tap((options) => {
      this.listOfPropertiesToEdit = Object.keys(options) as Array<keyof typeof options>

      this.chartOptionsForm.patchValue(options)
    })
  )

  constructor(private readonly chartAppearance: ChartAppearanceService) {
    this.chartOptionsForm.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(newValues => {

        console.log(newValues)
        this.chartAppearance.setChartAppearance(newValues as chartAppearance)
      })

  }

  ngOnInit(): void {

  }

  save() {

  }
}
