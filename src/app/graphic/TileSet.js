export default class TileSet {
  constructor(tileSetImage, tileSetSpec) {
    this.tileSetImage = tileSetImage;
    this.tileSetSpec = tileSetSpec;
  }

  draw(context, position, tileName) {
    const tile = this.tileSetSpec.tiles[tileName];
    const tileSize = this.tileSetSpec.size;
    const tileX = tile[0] * tileSize;
    const tileY = tile[1] * tileSize;

    context.drawImage(this.tileSetImage,
      tileX, tileY, tileSize, tileSize,            // Source
      position.x, position.y, tileSize, tileSize); // Destination
  }
}
