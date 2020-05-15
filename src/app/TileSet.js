import { calcTileX, calcTileY } from './lib/math'

export default class TileSet {
  constructor(tileSetImage, tileSize = 32) {
    this.tileSet = tileSetImage
    this.tileSize = tileSize
  }

  draw(context, position, tileNumber) {
    const tileX = calcTileX(tileNumber, this.tileSize, this.tileSet.width)
    const tileY = calcTileY(tileNumber, this.tileSize, this.tileSet.width)
    context.drawImage(this.tileSet,
      tileX, tileY, this.tileSize, this.tileSize,           // Source
      position.x, position.y, this.tileSize, this.tileSize) // Destination
  }
}
