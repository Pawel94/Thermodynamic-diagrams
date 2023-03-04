import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {delay, Observable, of} from 'rxjs';
import {chartService} from "../../common/services/server-communication/chart.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChartDataResolver implements Resolve<boolean> {
  constructor(private readonly diagramService: chartService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.diagramService.setStartUpData().pipe(
      delay(3000),
      catchError(() => {
        return of('No data');
      }))
  }
}
