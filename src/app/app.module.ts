import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DiagramComponent } from './diagram-chart/components/diagram/diagram/diagram.component';
import {DiagramContainerComponent} from "./diagram-chart/components/diagram-container/diagram-container.component";
@NgModule({
  declarations: [
    AppComponent,
    DiagramContainerComponent,
    DiagramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
