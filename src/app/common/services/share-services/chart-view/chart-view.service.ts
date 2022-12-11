import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChartViewService {
  private chartName = new BehaviorSubject<string>("Emagram");
  actualChartName$ = this.chartName.asObservable();

  constructor() {
  }

  setActualViewChart(name: string) {
    this.chartName.next(name)
  }
}
