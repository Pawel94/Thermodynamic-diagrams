import {helperLines, pointTO} from "../../modal/modal";
import {chartAppearance} from "../../../common/services/share-services/chart-apperance/chart-appearance.service";
import {modalAppearance} from "../../modal/apperanceModel";

export abstract class AbstractDiagram {
  rage: number[] = [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100]
  actualObservationTemperature?: pointTO[]
  actualObservationDewTemperature?: pointTO[]
  zoomFlag = false;

  chartAppearance!:chartAppearance

  constructor() {
  }
  public getChart(name: string) {

    return {
      subtitle: {
        text: name,
        align: 'left'
      },
      series: [{
        point: {},
        color: '#e56610',
        name: 'Thermo data',
      }],

      xAxis: {
        gridLineWidth: 1,
        tickInterval: 5,
        plotLines: [{
          color: 'red',
          dashStyle: 'longdashdot',
          value: 0,
          width: 2,
          shadow: true
        }],
        title: {
          text: 'Temperature',
        },
        min: -80,
        max: 80
      },
      mapNavigation: {
        enableMouseWheelZoom: true
      },
      yAxis: {
        labels: {
          format: '{value} hPa',
          style: {}
        },
        title: {
          text: 'Pressure ',
        },
        gridLineWidth: 1,
        type: 'logarithmic',
        reversed: true,
        min: 100,
        max: 900

      },
      plotOptions: {
        states: {
          hover: {enabled: false}
        },
        series: {},
        column: {
          stacking: "normal",
          minPointLength: 2
        },
        line: {}
      },
      chart: {
        type: 'line',
        zoomType: 'xy',
        panning: true,
        panKey: 'shift'
      },
      title: {
        text: `Upper air sounding chart - ${name}`,
      },
    };

  }

  public generateLineOnChart(name: string, color: modalAppearance, data?: any, linkedTo?: string) {
    let lineObject = new helperLines
    lineObject.name = name
    lineObject.color = color.lineColor
    lineObject.lineWidth = color.lineSize
    lineObject.data = data
    lineObject.linkedTo = linkedTo
    return lineObject
  }

  public getThermoChartModel(data: any) {
    return {
      color: '#e56610',
      type: 'scatter',
      marker: {
        enabled: false
      },
      data: data,
      pointStart: 900,
      pointInterval: 1550123,
      zIndex: 1,
      lineWidth: 6,
      dragDrop: {
        draggableY: false,
        draggableX: true
      },
      name: 'Thermo data'
    };

  }

  public getMoistAdiabatChartModel(data: any) {
    return {
      color: '#104ce5',
      type: 'scatter',
      marker: {
        enabled: false
      },
      data: data,
      pointStart: 900,
      pointInterval: 1550123,
      zIndex: 1,
      lineWidth: 6,
      dragDrop: {
        draggableY: false,
        draggableX: true
      },
      name: 'Dew point function'
    };

  }

}
