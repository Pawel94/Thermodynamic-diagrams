import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HighchartsChartModule} from 'highcharts-angular';
import {DiagramComponent} from './diagram-chart/components/diagram/diagram/diagram.component';
import {DiagramContainerComponent} from "./diagram-chart/components/diagram-container/diagram-container.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ToolbarComponent} from './common/component/toolbar/toolbar.component';
import {MatIconModule} from "@angular/material/icon";
import {ManagerContainerComponent} from './manager/components/manager-container/manager-container.component';
import {ThermodataComponent} from './manager/components/thermodata/thermodata/thermodata.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    DiagramContainerComponent,
    DiagramComponent,
    ToolbarComponent,
    ManagerContainerComponent,
    ThermodataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HighchartsChartModule, BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
