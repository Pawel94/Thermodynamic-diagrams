import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {observationData} from "../modal/modal";


@Injectable({
  providedIn: 'root'
})
export class DiagramService {

  constructor(private readonly http: HttpClient) {
  }

  public getDataFromServer(): Observable<observationData> {
    return this.http.get('/api', {responseType: "text"}).pipe(
      map(x => x.split(/\r?\n/)),
      map(x => x.filter((value: any, index: number) => index > 8 && index < 102)),
      map(x => this.getElementsFromLineofStrings(x)),
    )
  }

  private getElementsFromLineofStrings(data: any) {
    return data.map((lineWithString: string) => {
      let linetoArray = lineWithString.trim().split(/\s+/)
      return {
        pressure: Number(linetoArray[0]),
        height: Number(linetoArray[1]),
        temperature: Number(linetoArray[2] ?? 25),
        dewpoint: Number(linetoArray[3]) ?? null,
        relth: Number(linetoArray[4]) ?? '-',
        mixir: Number(linetoArray[5]) ?? '-',
        drct: Number(linetoArray[6]) ?? '-',
        sknt: Number(linetoArray[7]) ?? '-',
        THTA: Number(linetoArray[8]) ?? '-',
        THTE: Number(linetoArray[9]) ?? '-',
        THTV: Number(linetoArray[10]) ?? '-',
      } as observationData;

    })


  }
}

