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

  setActualDataFromChart(data: any) {
    const createdShareDataObject = {
      mappedDataToChart: data,
      coreData: this.mappPointsToPressureAndTemperature(data)
    } as sharedObservationData
    this.thermo$.next(createdShareDataObject);
  }


  private mapDataToChartPoints(data: features[]): any {
    let listOfPointsTemperature: pointTO[] = []
    let listOfPointsDewTemperature: pointTO[] = []
    data.map(element => {
      listOfPointsTemperature.push(new pointTO(element.properties.temp - 273, element.properties.pressure))
      listOfPointsDewTemperature.push(new pointTO(element.properties.dewpoint - 273, element.properties.pressure))
    })

    return {listOfPointsTemperature, listOfPointsDewTemperature}
  }

  private mappPointsToPressureAndTemperature(data: dataFromObservations): any {

    data.features.map(element => {
      element.properties.temp = element.properties.chart_value.x
      element.properties.pressure = element.properties.chart_value.y
    })

    return {
      features: data.features,
      properties: data.properties
    }
  }
}
