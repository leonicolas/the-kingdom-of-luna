export function calcTileX(tileNum, tileSize, tileSetWidth) {
  return (tileNum * tileSize) % tileSetWidth
}

export function calcTileY(tileNum, tileSize, tileSetWidth) {
  return ((tileNum * tileSize / tileSetWidth) | 0) * tileSize
}
