import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {dataFromObservations, features, pointTO} from "../modal/modal";
import {SuccessHandlerService} from "../../common/services/success-handler-notification/success-handler.service";


@Injectable({
  providedIn: 'root'
})
export class DiagramService {
  date: string = '20221102'
  stationNummer: string = '12374'
  dateMonth: string = '11'
  stationStartNumber: string | number = '12'
  stationEndNumber: string | number = '374'

  constructor(private readonly http: HttpClient, private readonly successNotification: SuccessHandlerService) {
  }

  public getActualData(date?: any, stationNummer?: string): Observable<dataFromObservations> {
    if (date && stationNummer) this.prepareDataToHTTPGet(date, stationNummer)
    return this.http
      .get<dataFromObservations>(`https://radiosonde.mah.priv.at/data/station/${this.stationStartNumber}/${this.stationEndNumber}/2022/${this.dateMonth}/fm94/${this.stationNummer}_${this.date}_120000.geojson`)
      .pipe(map(element => {
          return {
            properties: element.properties,
            features: this.mapPoints(element.features),
            mappedDataToChart: this.measuredData(element.features)
          }
        }),
        tap(x => this.successNotification.setSuccessMessage("Loaded data", {stationNummer, date}))
      )
  }

  private mapPoints(data: features[]): any {
    data.map(element => {
      element.properties.chart_value =
        new pointTO(element.properties.temp - 273, element.properties.pressure)
      element.properties.chart_value_dew =
        new pointTO(element.properties.dewpoint - 273, element.properties.pressure)
      element.properties.id = 2;
    })
    return data
  }

  private measuredData(data: features[]): any {
    data.map(element => {
      element.properties.temp = Number((element.properties.temp - 273).toFixed(2))
      element.properties.dewpoint = Number((element.properties.dewpoint - 273).toFixed(2))
      if (!Number.isNaN(element.properties.temp) && element.properties.pressure > 100) {
        element.properties.chart_value =
          new pointTO(element.properties.temp, element.properties.pressure)
        element.properties.chart_value_dew =
          new pointTO(element.properties.dewpoint, element.properties.pressure)
      }
      element.properties.wind = Math.sqrt(Math.pow(element.properties.wind_v, 2) + Math.pow(element.properties.wind_u, 2)).toFixed(2)
      element.properties.windDirection = (Math.atan2(element.properties.wind_v, element.properties.wind_u) * 57.2958).toFixed(0)
    })
    let measuredData = data.map(x => x.properties);
    return measuredData
  }

  private prepareDataToHTTPGet(date: any, stationNummer: string) {
    this.dateMonth = ('0' + date.month).slice(-2)
    this.date = String(date.year) + this.dateMonth + ('0' + String(date.day)).slice(-2)
    this.stationNummer = stationNummer
    this.stationStartNumber = (Number(stationNummer) / 1000).toFixed(0);
    this.stationEndNumber = Number(stationNummer) % 1000;
  }

}

