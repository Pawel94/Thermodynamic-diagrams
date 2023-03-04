import { Component } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";


@Component({
  selector: 'app-btn-cell-show',
  templateUrl: './btn-cell-show.component.html',
  styleUrls: ['./btn-cell-show.component.scss']
})
export class BtnCellShowComponent implements ICellRendererAngularComp  {
  private params: any;
  public flag:boolean=false
  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.flag =this.params.data?.showMarker
  }

  btnClickedHandler(event: any) {
    this.params.clicked(this.params.data);
  }

  refresh() {
    return true;
  }
}
