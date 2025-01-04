export function GetRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
export function GetRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
