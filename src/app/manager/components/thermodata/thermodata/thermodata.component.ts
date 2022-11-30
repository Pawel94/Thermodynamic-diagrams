import {Component, OnInit} from '@angular/core';
import {ThermodataService} from "../../../../common/services/share-services/thermodata/thermodata.service";
import {map, Observable} from "rxjs";
import {dataFromObservations, measuredData} from "../../../../diagram-chart/modal/modal";
import {CellValueChangedEvent, GridApi, GridReadyEvent} from "ag-grid-community";

@Component({
  selector: 'app-thermodata',
  templateUrl: './thermodata.component.html',
  styleUrls: ['./thermodata.component.scss']
})
export class ThermodataComponent implements OnInit {
  columnDefs = [{
    headerName: 'Pressure [hPa]',
    checkboxSelection: true,
    editable: true,
    width: 140,
    field: "pressure"
  }, {headerName: 'Temp. [K]', width: 140, field: "temp"}, {headerName: 'Temp. dew point [K]', field: "dewpoint"},
    {headerName: 'Height [m]', field: "gpheight"}, {
      headerName: 'Wind u ?',
      field: "wind_u"
    }, {headerName: 'Wind velocity [m/s]', field: "wind_v"}, {headerName: 'X-Point', field: "chart_value.x"}];
  public paginationPageSize = 60;

  dataToTable: Observable<measuredData[]> = this.thermoDataService.thermoData$.pipe(map(x => x.actualData))
  coreData?: dataFromObservations

  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi;
  private actualRowData: any[] = [];

  constructor(private readonly thermoDataService: ThermodataService) {
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api
  }

  ngOnInit(): void {

  }

  onCellValueChanged(event: CellValueChangedEvent) {

  }

  onRowsSelected() {

  }

  getRowData() {
    let rowData: any[] = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    })
    this.actualRowData = rowData
  }

  onRemoveSelected() {
    let selectedRowData = this.gridApi.getSelectedRows();
    this.gridApi.applyTransaction({remove: selectedRowData});
    this.updateChartWithNewData();
  }


  private updateChartWithNewData() {
    this.getRowData()
    this.thermoDataService.setActualTermoData(this.actualRowData)
  }
}
