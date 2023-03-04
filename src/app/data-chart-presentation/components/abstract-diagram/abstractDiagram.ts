import {pointTO} from "../../model/modal";
import {chartAppearance} from "../../../common/services/share-services/chart-apperance/chart-appearance.service";
import {modalAppearance} from "../../model/apperanceModel";

export abstract class AbstractDiagram {
  rage: number[] = [1000, 900, 800, 700, 600, 500, 400, 300, 200, 100]
  actualObservationTemperature?: pointTO[]
  actualObservationDewTemperature?: pointTO[]
  zoomFlag = false;
  chartAppearance!: chartAppearance

  constructor() {
  }

  public getChart(name: string, appearance?: chartAppearance) {
    return {
      subtitle: {
        text: name,
        align: 'left'
      },
      series: [{
        point: {},
        color: '#e56610',
        name: 'Thermo data',
      },
        {
          ...appearance?.dryAdiabaticFunctionAppearance,
          id: '1',
          linkedTo: undefined,
          data: []
        },
        {
          ...appearance?.ratioFunctionAppearance,
          id: '2',
          linkedTo: undefined,
          data: []
        },
        {
          ...appearance?.moistAdiabaticFunctionAppearance,
          id: '3',
          linkedTo: undefined,
          data: []
        },
        {
          ...appearance?.temperatureFunction,
          id: '4',
          linkedTo: undefined,
          data: []
        },
      ],

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


  public drawLineFunction(data: any, appearance: modalAppearance, zoomFlag: boolean = true) {
    return {
      ...appearance,
      type: 'scatter',
      marker: {
        enabled: false
      },
      data: data,
      pointStart: 900,
      pointInterval: 1550123,
      zIndex: 1,
      dragDrop: {
        draggableY: false,
        draggableX: !zoomFlag
      },
    };

  }

}
