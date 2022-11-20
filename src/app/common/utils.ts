export function generateLinearFunction(a: number, b: number): number[][] {
  const points: number[][] = [];
  let point: number[];

  const rage = generateRege(-80, 45)
  rage.forEach(x => {
    point = [x, a * x + b]
    if (a * x + b < 1010) points.push(point)

  })

  return points

}

function generateRege(from: number, to: number): any[] {
  const rage = []
  for (let x = from; x < to; x++) {

    rage.push(x)

  }
  return rage
}
