import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChartDataResolver} from "./data-chart-presentation/resolvers/chart-data.resolver";
import {
  DiagramContainerComponent
} from "./data-chart-presentation/components/diagram-container/diagram-container.component";

const routes: Routes = [
  {path: '', component: DiagramContainerComponent, resolve: {startUpData: ChartDataResolver}},
  {
    path: '404',
    loadComponent: () => import("./common/component/error-page/error-page.component").then(m => m.ErrorPageComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
