export default class TileSet {
  constructor(tileSetImage, tileSetSpec) {
    this.tileSetImage = tileSetImage;
    this.tileSetSpec = tileSetSpec;
    this.tileSize = tileSetSpec.tileSize;
  }

  draw(context, position, tileName) {
    const tile = this.tileSetSpec.tiles[tileName];
    const tileX = tile[0] * this.tileSize;
    const tileY = tile[1] * this.tileSize;

    context.drawImage(this.tileSetImage,
      tileX, tileY, this.tileSize, this.tileSize,            // Source
      position.x, position.y, this.tileSize, this.tileSize); // Destination
  }
}
