import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ChartAppearanceService} from "../../../common/services/share-services/chart-apperance/chart-appearance.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-chart-options',
  templateUrl: './chart-options.component.html',
  styleUrls: ['./chart-options.component.scss']
})
export class ChartOptionsComponent implements OnInit {
  chartOptionsForm = new FormGroup({
    dryAdiabaticFunctionColor: new FormControl(''),

  });
  defaultOptions$ =this.chartAppearance.chartAppearance$.pipe(
    tap((options) => {
      this.chartOptionsForm.patchValue(options)
      console.log(options)
    })
  )

  constructor(private readonly chartAppearance: ChartAppearanceService) {
  }

  ngOnInit(): void {

  }

  save() {

  }
}
