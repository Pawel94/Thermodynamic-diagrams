export interface point {
  point: [number][number]
}


export class pointTO {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export interface chartSerie {
  data?: any,
  marker?: {
    enabled: false
  },
  color?: string,
  dashStyle?: string,
  lineWidth?: number,
  id?: string,
  linkedTo?: string

}

export interface sharedObservationData {
  mappedDataToChart: pointTO[],
  coreData?: dataFromObservations
}


export interface dataFromObservations {
  features: features[]
  properties: properties

}

export interface properties {
  arrived: string,
  channel: string
  elewation: string,
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
}
