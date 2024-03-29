import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";
import {dataFromObservationsServer, features, pointTO} from "../share-services/model/modelDataFromServer";
import {SuccessHandlerService} from "../success-handler-notification/success-handler.service";
import {catchError} from "rxjs/operators";
import {ErrorHandlerService} from "../error-handler-notification/error-handler.service";
import {MeteoDataService} from "../share-services/meteo-data/meteo-data.service";
import {dataFormat} from "../../../meteorological-station/model/model";


@Injectable({
  providedIn: 'root'
})
export class chartService {
  date: string = '20221102'
  stationNummer: string = '12374'
  dateMonth: string = '11'
  stationStartNumber: string | number = '12'
  stationEndNumber: string | number = '374'

  constructor(private readonly http: HttpClient,
              private readonly successNotification: SuccessHandlerService,
              private readonly notificationError: ErrorHandlerService,
              private readonly thermoDataService: MeteoDataService,) {
  }

  public setStartUpData(): Observable<dataFromObservationsServer> {
    return this.http
      .get<dataFromObservationsServer>(`https://radiosonde.mah.priv.at/data/station/12/374/2023/01/fm94/12374_20230127_120000.geojson`)
      .pipe(
        map(element => ({
            properties: element.properties,
            features: this.mapPoints(element.features),
            mappedDataToChart: this.measuredData(element.features)
          } as dataFromObservationsServer
        ))
        , catchError(() => {
          return of({} as dataFromObservationsServer)
        })
      )

  }

  public getNewData(date: dataFormat, stationNumber: string): Observable<dataFromObservationsServer> {
    this.prepareDataToHTTPGet(date, stationNumber)
    return this.http
      .get<dataFromObservationsServer>(`https://radiosonde.mah.priv.at/data/station/${this.stationStartNumber}/${this.stationEndNumber}/2023/${this.dateMonth}/fm94/${this.stationNummer}_${this.date}_120000.geojson`)
      .pipe(map(element => ({
            properties: element.properties,
            features: this.mapPoints(element.features),
            mappedDataToChart: this.measuredData(element.features)
          } as dataFromObservationsServer
        )),
        tap(dataToChart => this.thermoDataService.setActualMeteoData(dataToChart)),
        tap(() => this.successNotification.setSuccessMessage("Loaded data", {stationNumber: stationNumber, date}))
        , catchError(err => {
          this.notificationError.setErrorMessage("Cannot get data for current data", err)
          return of({} as dataFromObservationsServer)
        })
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

  private prepareDataToHTTPGet(date: dataFormat, stationNumber: string) {
    this.dateMonth = ('0' + date.month).slice(-2)
    this.date = String(date.year) + this.dateMonth + ('0' + String(date.day)).slice(-2)
    this.stationNummer = stationNumber
    this.stationStartNumber = (Number(stationNumber) / 1000).toFixed(0);
    this.stationEndNumber = Number(stationNumber) % 1000;
  }

}

