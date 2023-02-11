import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

export interface chartAppearance {
  // moistLineColor: string,
  dryAdiabaticFunctionColor: string,
  dryAdiabaticFunctionSize:number
  saturatedAdiabaticFunctionColor: string,
  // thermoDataColor: string
  // dewDataColor: string,
  // ratioLineColor: string,
}

@Injectable({
  providedIn: 'root'
})
export class ChartAppearanceService {
  private chartAppearance = new BehaviorSubject<chartAppearance>(
    DEFAULT_APPERANCE
  );
  chartAppearance$ = this.chartAppearance.asObservable();

  constructor() {
  }

  setChartAppearance(chartAppearance: chartAppearance) {
    this.chartAppearance.next(chartAppearance)
  }
}

export let DEFAULT_APPERANCE = {
  dryAdiabaticFunctionColor: '#347957',
  dryAdiabaticFunctionSize:6,
  saturatedAdiabaticFunctionColor: '#2f7ed8'

} as chartAppearance
