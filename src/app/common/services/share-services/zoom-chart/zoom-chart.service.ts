import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {InfoHandlerService} from "../../info-handler-notification/info-handler.service";

@Injectable({
  providedIn: 'root'
})
export class ZoomChartService {

  private zoomChartState = new BehaviorSubject<boolean>(false);
  zoomChartState$ = this.zoomChartState.asObservable();

  constructor(private readonly infoNotificationService: InfoHandlerService) {
  }

  setZoomChartState(state: boolean) {
    this.infoNotificationService.setInfoMessage("Zoom changed: " + state)
    this.zoomChartState.next(state)
  }
}
