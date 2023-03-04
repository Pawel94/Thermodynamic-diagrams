import {Component, OnInit} from '@angular/core';
import {ThermodataService} from "../../../../common/services/share-services/thermodata/thermodata.service";
import {Observable} from "rxjs";
import {measuredData} from "../../../../data-chart-presentation/model/modal";
import {CellValueChangedEvent, ColDef, GridApi, GridReadyEvent, RowClassRules} from "ag-grid-community";
import {BtnCellShowComponent} from "../btn-cell-show/btn-cell-show.component";
import {BtnCellRemoveComponent} from "../btn-cell-remove/btn-cell-remove.component";
import {BtnCellShowDewComponent} from "../btn-cell-show-dew/btn-cell-show-dew.component";

@Component({
  selector: 'app-thermodata',
  templateUrl: './thermodata.component.html',
  styleUrls: ['./thermodata.component.scss']
})
export class ThermodataComponent implements OnInit {
  columnDefs = [
    {
      checkboxSelection: true,
      headerName: 'Add point to chart',
      cellRenderer: BtnCellShowComponent,
      cellStyle: {textAlign: 'center'},
      width: 100,
      cellRendererParams: {
        clicked: (field: any) => {
          this.markSelectedCell(field)
        }
      },
    },
    {
      headerName: 'Add point to chart - dew',
      cellRenderer: BtnCellShowDewComponent,
      width: 100,
      cellStyle: {textAlign: 'center'},
      cellRendererParams: {
        clicked: (field: any) => {
          this.markDewSelectedCell(field)
        }
      },
    },
    {
      headerName: '',
      headerComponentParams: {template: '<i class="bi bi-trash"></i>'},
      cellRenderer: BtnCellRemoveComponent,
      cellStyle: {textAlign: 'center'},
      width: 70,
      cellRendererParams: {
        clicked: (field: any) => {
          this.onRemoveButton(field)
        }
      },
    },
    {
      headerName: 'Pressure [hPa]',
      cellStyle: {textAlign: 'center'},
      valueFormatter: (params: any) => params.data.pressure + " hPa",
      width: 140,
      field: "pressure"
    },
    {
      headerName: 'Temp. [C]',
      cellStyle: {textAlign: 'center'},
      cellClass: 'edit-cell',
      editable: true,
      valueFormatter: (params: any) => params.data.temp + " ºC",
      width: 100,
      field: "temp"
    },
    {
      headerName: 'Temp. dew point [C]',
      width: 100,
      cellStyle: {textAlign: 'center'},
      cellClass: 'edit-cell',
      valueFormatter: (params: any) => params.data.dewpoint + " ºC",
      field: "dewpoint"
    },
    {headerName: 'Height [m]', width: 100, cellStyle: {textAlign: 'center'}, field: "gpheight"},
    {headerName: 'Wind  [m/s]', width: 100, cellStyle: {textAlign: 'center'}, field: "wind"},
    {headerName: 'Wind direction', width: 100, cellStyle: {textAlign: 'center'}, field: "windDirection"},
    {headerName: 'Wind u ', width: 100, cellStyle: {textAlign: 'center'}, field: "wind_u"},
    {headerName: 'Wind v', width: 100,cellStyle: {textAlign: 'center'}, field: "wind_v"},
  ];
  public paginationPageSize = 60;

  dataToTable: Observable<measuredData[]> = this.thermoDataService.dataToTable$
  getData?: any;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi;
  private actualRowData: any[] = [];
  public defaultColDef: ColDef = {
    resizable: true,

    wrapHeaderText: true,
    autoHeaderHeight: true,
    headerClass: 'text-center',
  };
  public rowClassRules: RowClassRules = {
    'row-selected': function (params) {
      return params.data.showMarker
    }
  };

  constructor(private readonly thermoDataService: ThermodataService) {
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api
  }

  ngOnInit(): void {

  }

  onCellValueChanged(event: CellValueChangedEvent) {

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

  onRemoveButton(field?: any) {
    this.gridApi.applyTransaction({remove: [field]});
    this.updateChartWithNewData();
  }

  markSelectedCells() {
    let selectedRowData = this.gridApi.getSelectedRows();
    selectedRowData.forEach(x => {
      x.showMarker = !x.showMarker
    })
    this.updateChartWithNewData();
  }

  markSelectedCell(field?: any) {
    field.showMarker = !field.showMarker
    this.updateChartWithNewData();
  }

  markDewSelectedCell(field?: any) {
    field.showMarkerDew = !field.showMarkerDew
    this.updateChartWithNewData();
  }

  saveEditedCells() {
    let selectedRowData = this.gridApi.getSelectedRows();
    this.updateChartWithNewData();
  }


  markDewSelectedCells() {
    let selectedRowData = this.gridApi.getSelectedRows();
    selectedRowData.forEach(x => {
      x.showMarkerDew = !x.showMarkerDew
    })
    this.updateChartWithNewData();
  }

  isSelectedRow() {
    return this.gridApi?.getSelectedRows().length === 0
  }

  private updateChartWithNewData() {
    this.getRowData()
    console.log(this.actualRowData)
    this.thermoDataService.setActualDataFromTable(this.actualRowData)
    this.thermoDataService.setActualDataToTable(this.actualRowData)
  }

}
