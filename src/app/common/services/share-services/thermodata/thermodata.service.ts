import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {observationData, pointTO} from "../../../../diagram-chart/modal/modal";

@Injectable({
  providedIn: 'root'
})
export class ThermodataService {

  tempData: any[] = [new pointTO(0, 1000), new pointTO(10, 700), new pointTO(5, 600), new pointTO(5, 500), new pointTO(5, 400), new pointTO(5, 300)]

  private thermo$ = new BehaviorSubject<any>({data:[]});
  thermoData$ = this.thermo$.asObservable();

  constructor() {

  }

  setDataForThermoChart(data: any) {
    let mapObservationDataToPoints = this.mapObservationDataToPoints(data);
    const object={
      data:mapObservationDataToPoints,
      dataFromUniversity:data
    }
    this.thermo$.next(object);
  }


  private mapObservationDataToPoints(recivedData: observationData[]) {
    let listOfPoints: any[] = []

    recivedData.map(data => {

      listOfPoints.push( new pointTO(data.temperature,data.pressure))
    })
    return listOfPoints;
  }
}
