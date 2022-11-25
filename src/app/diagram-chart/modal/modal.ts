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

export interface observationData {
  pressure: number,
  height: number
  temperature: number
  dewpoint: number | string
  relth: number | string
  mixir: number | string
  drct: number | string
  sknt: number | string
  THTA: number | string
  THTE: number | string
  THTV: number | string
}
