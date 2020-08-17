export function getIndexFromPosition(position, horizontalTilesNumber) {
  return (position.x % horizontalTilesNumber) + (position.y * horizontalTilesNumber);
}
