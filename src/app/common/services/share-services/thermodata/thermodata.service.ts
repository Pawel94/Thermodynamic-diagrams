import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {measuredData, sharedObservationData} from "../../../../data-chart-presentation/model/modal";

@Injectable({
  providedIn: 'root'
})
export class ThermodataService {
  private thermo$ = new BehaviorSubject<sharedObservationData | any>({mappedDataToChart: []});
  private mappedDataToDiagram = new BehaviorSubject<any>({})
  private mappedDataToSkewTDiagram = new BehaviorSubject<any>({})
  private stationData = new BehaviorSubject<any>({})
  private dataToTable = new BehaviorSubject<any>({})

  mappedDataToDiagram$ = this.mappedDataToDiagram.asObservable();
  mappedDataToSkewTDiagram$ = this.mappedDataToSkewTDiagram.asObservable();
  stationData$ = this.stationData.asObservable();
  dataToTable$ = this.dataToTable.asObservable()

  constructor() {
  }

  setActualTermoData(data: any) {
    const createdShareDataObject = {
      mappedDataToChart: this.mapDataToChartDiagram(data.mappedDataToChart, false),
      mappedDataToSkewTChart: this.mapDataToChartDiagram(data.mappedDataToChart, true),
      extraData: data.properties,
      actualData: data.mappedDataToChart
    }
    this.thermo$.next(createdShareDataObject);
    this.mappedDataToDiagram.next(createdShareDataObject.mappedDataToChart)
    this.mappedDataToSkewTDiagram.next(createdShareDataObject.mappedDataToSkewTChart)
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
    let mappedData = this.mapDataToChartDiagram(data, false)
    let mappedDataSkewT = this.mapDataToChartDiagram(data, true)
    this.mappedDataToDiagram.next(mappedData);
    this.mappedDataToSkewTDiagram.next(mappedDataSkewT);
  }


  private mapDataToChartDiagram(data: measuredData[], isSkewT?: boolean) {
    let listOfPointsTemperature: any[] = []
    let listOfPointsDewTemperature: any[] = []
    data.map(element => {
      if (element.pressure > 100) {
        listOfPointsTemperature.push({
          x: isSkewT ? this.castTemperatureToSkewT(element.temp, element.pressure) : Number(element.temp).toFixed(2),
          y: element.pressure,
          color: 'black',
          marker: {enabled: element.showMarker}
        })
        listOfPointsDewTemperature.push({
          x: isSkewT ? this.castTemperatureToSkewT(element.dewpoint, element.pressure) : Number(element.dewpoint).toFixed(2),
          y: element.pressure,
          color: 'orange',
          marker: {enabled: element.showMarkerDew}
        })
      }
    })
    return {listOfPointsTemperature, listOfPointsDewTemperature}
  }

  private castTemperatureToSkewT(temperature: number, pressue: number) {
    return (Number(temperature) + 35 * Math.log(1000 / pressue)).toFixed(2)
  }
}
