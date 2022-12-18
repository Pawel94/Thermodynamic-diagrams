import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface chartAppearance {
  // moistLineColor: string,
  dryAdiabaticFunctionColor: string,
  // thermoDataColor: string
  // dewDataColor: string,
  // ratioLineColor: string,
}

@Injectable({
  providedIn: 'root'
})
export class ChartAppearanceService {
  private chartAppearance = new BehaviorSubject<chartAppearance>({dryAdiabaticFunctionColor: '#347957'});
  chartAppearance$ = this.chartAppearance.asObservable();

  constructor() {
  }

  setChartAppearance(chartAppearance:chartAppearance) {
    this.chartAppearance.next(chartAppearance)
  }
}
