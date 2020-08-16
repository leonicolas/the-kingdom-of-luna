export function getIndexFromXY(x, y, lineSize) {
  return (x % lineSize) + (y * lineSize);
}
