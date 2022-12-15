import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ZoomChartService {

  private zoomChartState = new BehaviorSubject<boolean>(false);
  zoomChartState$ = this.zoomChartState.asObservable();
  constructor() { }

  setZoomChartState(state: boolean) {

    this.zoomChartState.next(state)
  }
}
