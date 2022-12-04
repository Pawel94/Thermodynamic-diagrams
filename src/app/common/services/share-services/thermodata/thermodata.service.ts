import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {measuredData, pointTO, sharedObservationData} from "../../../../diagram-chart/modal/modal";

@Injectable({
  providedIn: 'root'
})
export class ThermodataService {
  private thermo$ = new BehaviorSubject<sharedObservationData | any>({mappedDataToChart: []});
  private mappedDataToDiagram = new BehaviorSubject<any>({})
  private stationData = new BehaviorSubject<any>({})
  private dataToTable = new BehaviorSubject<any>({})
  thermoData$ = this.thermo$.asObservable();
  mappedDataToDiagram$ = this.mappedDataToDiagram.asObservable();
  stationData$ = this.stationData.asObservable();
  dataToTable$ = this.dataToTable.asObservable()

  constructor() {

  }

  setActualTermoData(data: any) {
    const createdShareDataObject = {
      mappedDataToChart: this.mapDataToPointsOnChart(data.mappedDataToChart),
      extraData: data.properties,
      actualData: data.mappedDataToChart
    }
    this.thermo$.next(createdShareDataObject);
    this.mappedDataToDiagram.next(createdShareDataObject.mappedDataToChart)
    this.setActualStationData(data.properties)
    this.setActualDataToTable(data.mappedDataToChart)
  }


  setActualStationData(data: any) {
    this.stationData.next(data)
  }
  setActualDataToTable(data: any) {
    this.dataToTable.next(data)
  }

  setActualDataFromTable(data: any) {
    let mappedData = this.mapDataToPointsOnChart(data)
    this.mappedDataToDiagram.next(mappedData);
  }

  private mapDataToPointsOnChart(data: measuredData[]) {
    let listOfPointsTemperature: any[] = []
    let listOfPointsDewTemperature: any[] = []
    data.map(element => {
      if (element.pressure > 100) {
        listOfPointsTemperature.push({
          x: element.temp.toFixed(2),
          y: element.pressure,
          color: 'black',
          marker: {enabled: element.showMarker}
        })
        listOfPointsDewTemperature.push({
          x: element.dewpoint.toFixed(2),
          y: element.pressure,
          color: 'orange',
          marker: {enabled: element.showMarkerDew}
        })
      }
    })

    return {listOfPointsTemperature, listOfPointsDewTemperature}
  }
}
