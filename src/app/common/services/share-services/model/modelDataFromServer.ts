export class pointTO {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}


export interface dataFromObservationsServer {
  features: features[]
  properties: properties
  mappedDataToChart: measuredData[]

}

export interface properties {
  arrived: string,
  channel: string
  elevation: string,
  station_id: string
  gts_topic: string
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
  showMarker: boolean
  showMarkerDew: boolean
  wind?: string
  windDirection?: string
}




