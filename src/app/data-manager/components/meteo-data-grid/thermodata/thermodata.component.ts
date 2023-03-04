import {Component, OnInit} from '@angular/core';
import {MeteoDataService} from "../../../../common/services/share-services/meteo-data/meteo-data.service";
import {Observable} from "rxjs";
import {measuredData} from "../../../../common/services/share-services/model/modelDataFromServer";
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
    {headerName: 'Wind v', width: 100, cellStyle: {textAlign: 'center'}, field: "wind_v"},
  ];
  public paginationPageSize = 60;

  dataToTable: Observable<measuredData[]> = this.thermoDataService.dataToTable$
  public rowSelection: 'single' | 'multiple' = 'multiple';
  private gridApi!: GridApi;
  private actualRowData: measuredData[] = [];
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

  constructor(private readonly thermoDataService: MeteoDataService) {
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api
  }

  ngOnInit(): void {

  }

  onCellValueChanged() {
    this.updateChartWithNewData();
  }


  getRowData() {
    let rowData: any[] = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    })
    this.actualRowData = rowData
  }


  onRemoveButton(field?: any) {
    this.gridApi.applyTransaction({remove: [field]});
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

  private updateChartWithNewData() {
    this.getRowData()
    this.thermoDataService.setActualDataFromTable(this.actualRowData)

  }

}
