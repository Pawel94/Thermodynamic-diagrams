import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {dataFromObservations} from "../modal/modal";


@Injectable({
  providedIn: 'root'
})
export class DiagramService {

  constructor(private readonly http: HttpClient) {
  }


  public getDataFromOgimet():Observable<dataFromObservations>{
    return this.http.get<dataFromObservations>('https://radiosonde.mah.priv.at/data/station/12/374/2022/11/fm94/12374_20221126_120000.geojson')
  }

}

