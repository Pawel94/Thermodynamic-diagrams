import {Component} from '@angular/core';
import * as Highcharts from 'highcharts';
import {LoaderService} from "./common/services/load-service/load-service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

const Draggable = require("highcharts/modules/draggable-points.js");
Draggable(Highcharts);
const Exporting = require("highcharts/modules/exporting.js");
Exporting(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public readonly loaderService: LoaderService,private router: Router) {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loaderService.isLoading.next(true)
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loaderService.isLoading.next(false)
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit(): void {

  }
}
