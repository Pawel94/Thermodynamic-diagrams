import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {modalAppearance} from "../../../../data-chart-presentation/model/apperanceModel";

export interface chartAppearance {
  dryAdiabaticFunctionAppearance: modalAppearance;
  ratioFunctionAppearance: modalAppearance
  moistAdiabaticFunctionAppearance: modalAppearance
  temperatureFunction: modalAppearance
  mainTemperature: modalAppearance
  mainDewPoint: modalAppearance

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

  dryAdiabaticFunctionAppearance: {
    name: "Dry Adiabatic Function",
    color: '#347957',
    lineWidth: 2,
    linkedTo: '1',
  },
  ratioFunctionAppearance: {
    name: "Ratio Function",
    color: '#40d82f',
    lineWidth: 2,
    linkedTo: '2',
  },
  moistAdiabaticFunctionAppearance: {
    name: "Moist Adiabatic Function",
    color: '#2f7ed8',
    lineWidth: 2,
    linkedTo: '3',
  },
  temperatureFunction: {
    name: "Isotherms",
    color: '#cb0e3a',
    lineWidth: 2,
    linkedTo: '4',
  },
  mainTemperature: {
    name: "Temperature",
    color: '#cb0e3a',
    lineWidth: 10
  },
  mainDewPoint: {
    name: "Dewpoint",
    color: '#104ce5',
    lineWidth: 10
  }
} as chartAppearance
