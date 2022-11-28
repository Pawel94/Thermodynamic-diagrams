import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {dataFromObservations, features, pointTO} from "../modal/modal";


@Injectable({
  providedIn: 'root'
})
export class DiagramService {
  date:string = '20221128'
  constructor(private readonly http: HttpClient) {
  }

  public getActualData(): Observable<dataFromObservations> {
    return this.http
      .get<dataFromObservations>(`https://radiosonde.mah.priv.at/data/station/12/374/2022/11/fm94/12374_${this.date}_120000.geojson`)
      .pipe(map(element => {
        return {properties: element.properties, features: this.mapPoints(element.features)}
      }))
  }


  private mapPoints(data: features[]): any {
    data.map(element => {
      element.properties.chart_value =
        new pointTO(element.properties.temp - 273, element.properties.pressure)
      element.properties.chart_value_dew =
        new pointTO(element.properties.dewpoint - 273, element.properties.pressure)
    })
    return data
  }
}

