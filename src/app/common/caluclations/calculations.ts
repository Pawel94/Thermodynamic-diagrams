export function generateThermoLines(temper: number): number[][] {
  const points: number[][] = [];
  let point: number[];
  const pressureRage = generateRage(0, 1050)

  pressureRage.forEach(pressure => {
    let scewT_temperature = temper + 35 * Math.log(1000 / pressure)
    point = [scewT_temperature, pressure]
    points.push(point)
  })
  return points
}

export function generateDryAdiabatFunctionForSkewT(temper: number): number[][] {
  const points: number[][] = [];
  let point: number[];
  const pressureRage = generateRage(0, 1050)

  const kelvinTemp = temper + 273

  pressureRage.forEach(pressure => {
    const val = (pressure / 1000)
    const result = Math.pow(val, 0.288) * kelvinTemp
    let temperature = result - 273
    let scewT_temperature = temperature + 35 * Math.log(1000 / pressure)
    point = [scewT_temperature, pressure]
    points.push(point)
  })
  return points
}

export function generateDryAdiabatFunctionForEmagram(temper: number): number[][] {
  const points: number[][] = [];
  let point: number[];
  const pressureRage = generateRage(0, 1050)

  const kelvinTemp = temper + 273

  pressureRage.forEach(pressure => {
    const val = (pressure / 1000)
    const result = Math.pow(val, 0.288) * kelvinTemp
    point = [result - 273, pressure]
    points.push(point)
  })
  return points
}

export const generateMoistAdiabaticEmagramLine = (p: any, t0: any) => {
  const points: number[][] = [];
  let point: number[];
  let results = [[p[0], t0]];

  let t = t0;

  for (let i = 0; i < p.length - 1; i++) {
    if (Math.log(p[i + 1]) - Math.log(p[i]) < Math.log(790) - Math.log(800)) {
      //      const n = 15;
      const n =
        Math.floor(
          (Math.log(p[i + 1]) - Math.log(p[i])) /
          (Math.log(790) - Math.log(800))
        ) + 1;
      const p_sub = linspace(p[i], p[i + 1], n);
      for (let j = 0; j < p_sub.length - 1; j++) {
        t = t + moistLapse(p_sub[j], t) * (p_sub[j + 1] - p_sub[j]);
      }
    } else {
      t = t + moistLapse(p[i], t) * (p[i + 1] - p[i]);

    }
    results.push([p[i + 1], t]);

    point = [t, p[i + 1]]
    points.push(point)
  }
  return points;
};

export const generateMoistAdiabaticSkewTLine = (p: any, t0: any) => {
  const points: number[][] = [[t0, p[0]]];
  let point: number[];
  let results = [[p[0], t0]];
  let t = t0;

  for (let i = 0; i < p.length - 1; i++) {
    if (Math.log(p[i + 1]) - Math.log(p[i]) < Math.log(790) - Math.log(800)) {
      //      const n = 15;
      const n =
        Math.floor(
          (Math.log(p[i + 1]) - Math.log(p[i])) /
          (Math.log(790) - Math.log(800))
        ) + 1;
      const p_sub = linspace(p[i], p[i + 1], n);
      for (let j = 0; j < p_sub.length - 1; j++) {
        t = t + moistLapse(p_sub[j], t) * (p_sub[j + 1] - p_sub[j]);
      }
    } else {
      t = t + moistLapse(p[i], t) * (p[i + 1] - p[i]);

    }
    results.push([p[i + 1], t]);
    let temp = t + 35 * Math.log(1000 / p[i + 1])
    point = [temp, p[i + 1]]
    points.push(point)
  }
  return points;
};


export const generateSaturationMixingRatioLine = (p: any, w0: number) => {
  w0 = w0 / 1000;
  let a = p.map((pin: any) => [
    dewpoint_from_e(pin * 100, (pin * 100 * w0) / (epsilon + w0)) - 273,
    pin,
  ]);
  return a
};
const dewpoint_from_e = (p: any, e: any) => {
  const val = Math.log(e / water_es_0c);
  return (243.5 * val) / (17.67 - val) + 273.15;
};


function generateRage(from: number, to: number): any[] {
  const rage = []
  for (let x = from; x < to; x += 100) {
    rage.push(x)

  }
  return rage
}


////////////////
const Rd = 287.04
const g = 9.81
const Rv = 461.5
const epsilon = Rd / Rv
const cpd = 1005.07


const linspace = (a: number, b: number, n: number) => {
  if (typeof n === 'undefined') n = Math.max(Math.round(b - a) + 1, 1);
  if (n < 2) {
    return n === 1 ? [a] : [];
  }
  let ret = Array(n);
  n--;
  for (let i = n; i >= 0; i--) {
    ret[i] = (i * b + (n - i) * a) / n;
  }
  return ret;
};
const water_es_0c = 611.2; // Pa
const air_Rd = 287.05; // J/(K kg)
const air_Cp_d = 1004.0; //  J/(K kg)
const water_Lv_0c = 2.5e6; // J/kg
const epsilon2 = 0.622; // water_Mv / air_Md;
const kappa = 0.286; //air_Rd / air_Cp_d;

const moistLapse = (p: number, t: number) => {
  let p_pa = p * 100;
  let t_k = t + 273.15;
  const rs = mixingRatio(p_pa, saturationVaporPressure(t_k));
  return (
    (((1 / p_pa) * (air_Rd * t_k + water_Lv_0c * rs)) /
      (air_Cp_d + (water_Lv_0c ** 2 * rs * epsilon2) / air_Rd / t_k ** 2)) *
    100
  );
};

const mixingRatio = (p: number, e: number) => (epsilon * e) / (p - e);
const saturationVaporPressure = (t: number) =>
  611.2 * Math.exp((17.67 * (t - 273.15)) / (t - 29.65));






