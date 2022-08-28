export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomFromArray<T>(arr: T[]): T {
  return arr[randomIntFromInterval(0, arr.length - 1)];
}
