export function getDuration(value: number) {
  const calcValue = value / 1000;
  const minutes = Math.floor(calcValue / 60);
  const seconds = Math.floor(calcValue - minutes * 60);
  return minutes.toString()
    + ':' +
    ((seconds < 10) ? '0' + seconds.toString() : seconds.toString());
}