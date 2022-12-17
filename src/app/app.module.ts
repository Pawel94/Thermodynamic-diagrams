import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HighchartsChartModule} from 'highcharts-angular';
import {DiagramComponent} from './diagram-chart/components/diagram/diagram/diagram.component';
import {DiagramContainerComponent} from "./diagram-chart/components/diagram-container/diagram-container.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ManagerContainerComponent} from './manager/components/manager-container/manager-container.component';
import {ThermodataComponent} from './manager/components/thermodata/thermodata/thermodata.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AgGridModule} from "ag-grid-angular";
import { BtnCellShowComponent } from './manager/components/thermodata/btn-cell-show/btn-cell-show.component';
import { BtnCellRemoveComponent } from './manager/components/thermodata/btn-cell-remove/btn-cell-remove.component';
import { StationSearchModelComponent } from './stationManager/station-search-model/station-search-model.component';
import {ReactiveFormsModule} from "@angular/forms";
import { InfoModalComponent } from './common/component/info-modal/info-modal.component';
import { DiagramSkewTComponent } from './diagram-chart/components/diagram/diagram-skew-t/diagram-skew-t.component';
import { SidebarComponent } from './common/component/sidebar/sidebar.component';
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import { BtnCellShowDewComponent } from './manager/components/thermodata/btn-cell-show-dew/btn-cell-show-dew.component';
import { NotifiactionComponent } from './common/component/notification/notifiaction/notifiaction.component';

@NgModule({
  declarations: [
    AppComponent,
    DiagramContainerComponent,
    DiagramComponent,
    ManagerContainerComponent,
    ThermodataComponent,
    BtnCellShowComponent,
    BtnCellRemoveComponent,
    StationSearchModelComponent,
    InfoModalComponent,
    DiagramSkewTComponent,
    SidebarComponent,
    BtnCellShowDewComponent,
    NotifiactionComponent,


  ],
    imports: [
        BrowserModule,
        AppRoutingModule, HighchartsChartModule, BrowserAnimationsModule,
        NgbModule,
        HttpClientModule,
        AgGridModule, ReactiveFormsModule
    ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
