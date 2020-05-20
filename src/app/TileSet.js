export default class TileSet {
  constructor(tileSetImage, tileSize = 16) {
    this.tileSet = tileSetImage
    this.tileSize = tileSize
  }

  draw(context, position, tileNumber) {
    const tileX = tileNumber.x * this.tileSize
    const tileY = tileNumber.y * this.tileSize
    context.drawImage(this.tileSet,
      tileX, tileY, this.tileSize, this.tileSize,           // Source
      position.x, position.y, this.tileSize, this.tileSize) // Destination
  }
}
