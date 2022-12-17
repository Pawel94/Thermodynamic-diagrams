import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
  selector: 'app-btn-cell-show-dew',
  templateUrl: './btn-cell-show-dew.component.html',
  styleUrls: ['./btn-cell-show-dew.component.scss']
})
export class BtnCellShowDewComponent implements ICellRendererAngularComp {

  private params: any;
  public flag:boolean=false
  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.flag =this.params.data?.showMarkerDew
  }

  btnClickedHandler(event: any) {
    this.params.clicked(this.params.data);
  }

  refresh() {
    return true;
  }

}
