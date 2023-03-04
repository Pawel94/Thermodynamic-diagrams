import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {dataFromObservationsServer, measuredData, properties} from "../model/modelDataFromServer";

export interface listOfPointsToChart {
  listOfPointsTemperature: chartPoint[]
  listOfPointsDewTemperature: chartPoint[]
}

export interface chartPoint {
  color: string,
  marker: any,
  x: string,
  y: number
}

@Injectable({
  providedIn: 'root'
})

export class MeteoDataService {

  private mappedDataToDiagram = new BehaviorSubject<listOfPointsToChart>({} as listOfPointsToChart)
  private mappedDataToSkewTDiagram = new BehaviorSubject<listOfPointsToChart>({} as listOfPointsToChart)
  private stationData = new BehaviorSubject<properties>({} as properties)
  private dataToTable = new BehaviorSubject<any>({})
  mappedDataToDiagram$ = this.mappedDataToDiagram.asObservable();
  mappedDataToSkewTDiagram$ = this.mappedDataToSkewTDiagram.asObservable();
  stationData$ = this.stationData.asObservable();
  dataToTable$ = this.dataToTable.asObservable()


  constructor() {
  }

  setActualMeteoData(data: dataFromObservationsServer): void {
    const createdShareDataObject = {
      mappedDataToChart: this.mapDataToChartDiagram(data.mappedDataToChart, false),
      mappedDataToSkewTChart: this.mapDataToChartDiagram(data.mappedDataToChart, true),
      extraData: data.properties,
      actualData: data.mappedDataToChart
    }
    this.mappedDataToDiagram.next(createdShareDataObject.mappedDataToChart)
    this.mappedDataToSkewTDiagram.next(createdShareDataObject.mappedDataToSkewTChart)
    this.setActualStationData(data.properties)
    this.setActualDataToTable(data.mappedDataToChart)
  }


  setActualStationData(data: properties): void {
    this.stationData.next(data)
  }

  setActualDataToTable(data: measuredData[]): void {
    this.dataToTable.next(data)
  }

  setActualDataFromTable(data: measuredData[]): void {
    const mappedData: listOfPointsToChart = this.mapDataToChartDiagram(data, false)
    const mappedDataSkewT: listOfPointsToChart = this.mapDataToChartDiagram(data, true)
    this.mappedDataToDiagram.next(mappedData);
    this.mappedDataToSkewTDiagram.next(mappedDataSkewT);
    this.setActualDataToTable(data)
  }

  private mapDataToChartDiagram(data: measuredData[], isSkewT?: boolean): listOfPointsToChart {
    const listOfPointsTemperature: chartPoint[] = []
    const listOfPointsDewTemperature: chartPoint[] = []
    data.map(element => {
      if (element.pressure > 100) {
        listOfPointsTemperature.push({
          x: isSkewT ? this.castTemperatureToSkewT(element.temp, element.pressure) : Number(element.temp).toFixed(2),
          y: element.pressure,
          color: 'black',
          marker: {enabled: element.showMarker}
        } as chartPoint)
        listOfPointsDewTemperature.push({
          x: isSkewT ? this.castTemperatureToSkewT(element.dewpoint, element.pressure) : Number(element.dewpoint).toFixed(2),
          y: element.pressure,
          color: 'orange',
          marker: {enabled: element.showMarkerDew}
        } as chartPoint)
      }
    })
    return {listOfPointsTemperature, listOfPointsDewTemperature} as listOfPointsToChart;
  }

  private castTemperatureToSkewT(temperature: number, pressure: number): string {
    return (Number(temperature) + 35 * Math.log(1000 / pressure)).toFixed(2)
  }
}
