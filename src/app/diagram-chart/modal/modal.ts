export class pointTO {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export interface chartSerie {
  name: string
  data?: any,
  marker?: {
    enabled: false
  },
  color?: string,
  dashStyle?: string,
  lineWidth?: number,
  id?: string,
  linkedTo?: string
  zIndex?: number
}

export interface sharedObservationData {
  mappedDataToChart: pointTO[]
  coreData?: dataFromObservations
  modifiedData:measuredData[]
}

export interface dataFromObservations {
  features: features[]
  properties: properties
  mappedDataToChart:measuredData[]

}

export interface properties {
  arrived: string,
  channel: string
  elewation: string,
  station_id:string
  gts_topic:string
}

export interface features {
  geometry: any,
  properties: measuredData
}

export interface measuredData {
  dewpoint: number,
  flags: number,
  gpheight: number,
  pressure: number,
  temp: number,
  time: number,
  wind_u: number,
  wind_v: number,
  chart_value: pointTO
  chart_value_dew: pointTO
  id: number
  showMarker:boolean
  showMarkerDew:boolean
}

export let helperLine = {
  color: 'rgba(227,12,12,0.32)',
  enableMouseTracking: false,
  dashStyle: 'Line',
  zIndex: 5,
  lineWidth: 1,
  name: '',
} as chartSerie

export class helperLines {
  color: string
  enableMouseTracking: boolean
  dashStyle: string
  zIndex: number
  lineWidth: number
  name: string
  data: any;
  linkedTo: any;
  marker: any;

  constructor() {
    this.color = 'rgba(227,12,12,0.32)'
    this.enableMouseTracking = false;
    this.dashStyle = 'Line';
    this.zIndex = 5;
    this.lineWidth = 1;
    this.name = '';
    this.marker = {
      enabled: false
    }
  }
}
