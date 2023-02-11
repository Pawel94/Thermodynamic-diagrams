import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {delay, Observable, of} from 'rxjs';
import {DiagramService} from "../services/diagram.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChartDataResolver implements Resolve<boolean> {
  constructor(private readonly diagramService: DiagramService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.diagramService.setStartUpData().pipe(
      delay(3000),
      catchError(error => {
        console.error("!!!")
        return of('No data');
      }))
  }
}
