import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
  selector: 'app-btn-cell-remove',
  templateUrl: './btn-cell-remove.component.html',
  styleUrls: ['./btn-cell-remove.component.scss']
})
export class BtnCellRemoveComponent implements ICellRendererAngularComp {

  private params: any;
  constructor() { }

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(event: any) {
    this.params.clicked(this.params.data);
  }

  refresh() {
    return false;
  }

}
