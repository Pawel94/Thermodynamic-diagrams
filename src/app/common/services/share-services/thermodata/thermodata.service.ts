import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {measuredData, pointTO, sharedObservationData} from "../../../../diagram-chart/modal/modal";

@Injectable({
  providedIn: 'root'
})
export class ThermodataService {

  tempData: any[] = [new pointTO(0, 1000), new pointTO(5, 700), new pointTO(6, 600), new pointTO(7, 500), new pointTO(5, 400), new pointTO(5, 300)]

  private thermo$ = new BehaviorSubject<sharedObservationData | any>({mappedDataToChart: []});
  thermoData$ = this.thermo$.asObservable();

  constructor() {

  }

  setActualTermoData(data: any) {
    console.log(data)
    const createdShareDataObject = {
      mappedDataToChart: this.mapDataToPointsOnChart(data),
      actualData: data
    }
    this.thermo$.next(createdShareDataObject);
  }


  private mapDataToPointsOnChart(data: measuredData[]) {
    let listOfPointsTemperature: any[] = []
    let listOfPointsDewTemperature: any[] = []
    data.map(element => {
      listOfPointsTemperature.push({
        x: element.temp,
        y: element.pressure,
        color: 'black',
        marker: {enabled: element.showMarker}
      })
      listOfPointsDewTemperature.push({
        x: element.dewpoint,
        y: element.pressure,
        color: 'orange',
        marker: {enabled: element.showMarkerDew}
      })
    })

    return {listOfPointsTemperature, listOfPointsDewTemperature}
  }
}
