import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {modalAppearance} from "../../../../diagram-chart/modal/apperanceModel";

export interface chartAppearance {
  dryAdiabaticFunctionAppearance:modalAppearance;
  ratioFunctionAppearance:modalAppearance
  moistAdiabaticFunctionAppearance:modalAppearance
  temperatureFunction:modalAppearance
}

@Injectable({
  providedIn: 'root'
})
export class ChartAppearanceService {
  private chartAppearance = new BehaviorSubject<chartAppearance>(
    DEFAULT_APPEARANCE
  );
  chartAppearance$ = this.chartAppearance.asObservable();

  constructor() {
  }

  setChartAppearance(chartAppearance: chartAppearance) {
    this.chartAppearance.next(chartAppearance)
  }
}

export let DEFAULT_APPEARANCE = {

  dryAdiabaticFunctionAppearance:{
    name:"Dry Adiabatic Function Appearance",
    lineColor:'#347957',
    lineSize:2
  },
  ratioFunctionAppearance:{
    name:"Ratio Function Appearance",
    lineColor:'#40d82f',
    lineSize:2
  },
  moistAdiabaticFunctionAppearance:{
    name:"Moist Adiabatic Function Appearance",
    lineColor:'#2f7ed8',
    lineSize:2
  },
  // temperatureFunction:{
  //   lineColor:'#cb0e3a',
  //   lineSize:14
  // }
} as chartAppearance
