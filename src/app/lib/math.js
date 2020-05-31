export function calcIndex(x, y, lineSize) {
  return (x % lineSize) + (y * lineSize);
}
