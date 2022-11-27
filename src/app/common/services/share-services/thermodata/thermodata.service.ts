import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {dataFromObservations, features, pointTO, sharedObservationData} from "../../../../diagram-chart/modal/modal";

@Injectable({
  providedIn: 'root'
})
export class ThermodataService {

  tempData: any[] = [new pointTO(0, 1000), new pointTO(5, 700), new pointTO(6, 600), new pointTO(7, 500), new pointTO(5, 400), new pointTO(5, 300)]

  private thermo$ = new BehaviorSubject<sharedObservationData>({mappedDataToChart: []});
  thermoData$ = this.thermo$.asObservable();

  constructor() {

  }

  setActualDataToChart(data: dataFromObservations) {
    const createdShareDataObject = {
      mappedDataToChart: this.mapDataToChartPoints(data.features),
      coreData: data
    } as sharedObservationData
    this.thermo$.next(createdShareDataObject);

  }


  private mapDataToChartPoints(data: features[]): pointTO[] {
    let listOfPoints: pointTO[] = []
    data.map(element => {
      listOfPoints.push(new pointTO(element.properties.temp - 273, element.properties.pressure))
    })
    return listOfPoints;
  }
}
