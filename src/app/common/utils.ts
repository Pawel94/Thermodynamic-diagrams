export function generateThermoLines(temper: number): number[][] {
  const points: number[][] = [];
  let point: number[];
  const pressureRage = generateRage(0, 1050)

  pressureRage.forEach(pressure => {
    let scewT_temperature = temper+35*Math.log(1000/pressure)
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
    let scewT_temperature = temperature+35*Math.log(1000/pressure)
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
  const points: number[][] = [[t0,p[0]]];
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
    let temp = t+35*Math.log(1000/p[i + 1])
    point = [temp, p[i + 1]]
    points.push(point)
  }
  return points;
};



export const generateSaturationMixingRatioLine = (p:any, w0:number) => {
  w0= w0/1000;
  let a = p.map((pin:any) => [
    dewpoint_from_e(pin * 100, (pin * 100 * w0) / (epsilon + w0))-273,
    pin,
  ]);
return a
};
const dewpoint_from_e = (p:any, e:any) => {
  const val = Math.log(e / water_es_0c);
  return (243.5 * val) / (17.67 - val) + 273.15;
};




// Others function to Scew-T chart,now it isnt working
/**TODO check this functions **/

export function generateWetAdiabatFunction(t: number, p: number): number {


  t = t + 273;
  let point: number[];
  const pressureRage = generateRage(0, 1050)
  // let a = OS(t, p)
// let a = -2.651
  let a = t;
  let tq = 253.16
  let d = 120
  let TSA = 0;
  for (let i = 0; i <= 13; i++) {

    d = d / 2
    let x = a * Math.exp(-2.6518986 * W(tq, p) / tq) - tq * Math.pow((1000 / p), 0.288)
    // if (Math.abs(x) <= 0.0000001) {
    //   tq = tq + SIGN(d, x)
    // }
    if (Math.abs(x) <= 0.0000001) {
      break
    } else {
      tq = tq + SIGN(d, x)
    }
  }
  TSA = tq - 273.16


  pressureRage.forEach(pressure => {

  })
  return TSA
}

function OS(t: number, p: number) {
  return t * Math.pow((1000 / p), 0.288) / Math.exp(-2.651899 * W(t, p) / t)
}

function SIGN(x: number, y: number) {
  if (y < 0) {
    return -Math.abs(x)
  } else {
    return Math.abs(x)
  }
}

function generateRage(from: number, to: number): any[] {
  const rage = []
  for (let x = from; x < to; x += 100) {
    rage.push(x)

  }
  return rage
}

function W(t: number, p: number) {
  let x = ESAT2(t)
  return 622 * x / (p - x)
}


function ESAT(t: number) {
  let a0 = 23.832241 - 5.02808 * Math.log10(t)

  let a1 = 0.00000013816 * Math.pow(10, (11.344 - 0.0303998 * t));
  let a2 = 0.0081328 * Math.pow(10, (3.49149 - 1302.8844 / t))
  return Math.pow(10, a0 - a1 + a2 - 2949.076 / t)
}

function ESAT2(t: number) {
  t = t - 273.15;
  let result = 6.1078 * Math.exp((17.2693882 * t) / (t + 237.3));
  // result = result * 100.0; // Convert hPa to Pa
  return result;
}


export function getYByPEquiPotTemp(p: number, thetae: number) {
  // thetae = thetae + 273.15
  let T = tempByEquiPotTempAndPres(thetae, p);
  // return getYByPT(p, T);
  return T - 273
}

export function tempByEquiPotTempAndPres(thetae: number, pres: number): number {

  if (pres === undefined || isNaN(pres))
    return 0;
  var s = undefined;
  var th = undefined;
  var pcon = Math.pow(1000 / pres, .286);
  var t = 273.0;
  var delta = 20;
  var i = 0;
  while (Math.abs(delta) > 0.1 && i < 100) {
    i++;
    s = saturationHMRByTempAndPres(t, pres);
    th = t * pcon * Math.exp(2.5 * s / t);
    if ((th - thetae) * delta > 0.0)
      delta = -.5 * delta;
    t = t + delta;
  }
  return t;
}

export function saturationHMRByTempAndPres(temp: number, pres: number): number {
  var e = saturationPressureByTemp(temp);
  if (e === undefined ||
    pres === undefined || isNaN(pres)) {
    console.log("A")
    return 0;
  }
  return 621.97 * e / (pres - e);
}

export function saturationPressureByTemp(temp: number) {
  if (temp === undefined || isNaN(temp))
    return undefined;
  var coef = new Array(6.1104546, 0.4442351, 1.4302099e-2, 2.6454708e-4, 3.0357098e-6, 2.0972268e-8, 6.0487594e-11, -1.469687e-13);
  var inx = 0;
  // sat vap pressures every 5C from -50 to -200
  var escold = new Array(
    0.648554685769663908E-01, 0.378319512256073479E-01,
    0.222444934288790197E-01, 0.131828928424683120E-01,
    0.787402077141244848E-02, 0.473973049488473318E-02,
    0.287512035504357928E-02, 0.175743037675810294E-02,
    0.108241739518850975E-02, 0.671708939185605941E-03,
    0.419964702632039404E-03, 0.264524363863469876E-03,
    0.167847963736813220E-03, 0.107285397631620379E-03,
    0.690742634496135612E-04, 0.447940489768084267E-04,
    0.292570419563937303E-04, 0.192452912634994161E-04,
    0.127491372410747951E-04, 0.850507010275505138E-05,
    0.571340025334971129E-05, 0.386465029673876238E-05,
    0.263210971965005286E-05, 0.180491072930570428E-05,
    0.124607850555816049E-05, 0.866070571346870824E-06,
    0.605982217668895538E-06, 0.426821197943242768E-06,
    0.302616508514379476E-06, 0.215963854234913987E-06,
    0.155128954578336869E-06);

  temp = temp - 273.15;
  var retval = 0;
  //try {
  if (temp > -50.) {
    retval = (coef[0] + temp * (coef[1] + temp * (coef[2] + temp * (coef[3] +
      temp * (coef[4] + temp * (coef[5] + temp * (coef[6] + temp * coef[7])))))));

  } else {
    var tt = (-temp - 50.) / 5.;
    //var = (int) tt;
    if (inx < escold.length - 1) {
      retval = escold[inx] + (tt % 1.) * (escold[inx + 1] - escold[inx]);
    } else {
      retval = 1e-7;
    }
  }
  // } catch (Exception e) {
  //   GWT.log("caught exception: "+e);
  //  retval = 1e-7;
  //}
  return retval;
}

////////////////
const Rd = 287.04
const g = 9.81
const Rv = 461.5
const epsilon = Rd / Rv
const cpd = 1005.07

function dTdz_moist(T: number, p: number) {
  let pd = p - es(T)
  let num = 1. + ((Lv(T) * w_vs(T, pd)) / (Rd * T))
  let den = 1. + ((Lv(T) ** 2 * w_vs(T, pd)) / (cpd * Rv * T ** 2))
  return (-g / cpd) * (num / den)
}

export function dTdp_moist(T: number, p: number) {
  return dTdz_moist(T, p) * -((Rd * T) / (p * g))
}

function es(T: number) {
  return 611.2 * Math.exp(17.67 * (T - 273.15) / (T - 29.65))
}

function Lv(T: number) {

  return 2.501e6
}

function w_vs(T: number, pd: number) {
  return epsilon * (es(T) / pd)
}


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






