export default class TileSet {
  constructor(tileSetImage, tileSetSpec) {
    this.tileSetImage = tileSetImage;
    this.tileSetSpec = tileSetSpec;
    this.tileSize = tileSetSpec.tileSize;
  }

  get(tileName) {
    const tile = this.tileSetSpec.tiles[tileName];
    const tileY = tile[0] * this.tileSize;
    const tileX = tile[1] * this.tileSize;

    return {
      draw: (context, position) =>
        context.drawImage(this.tileSetImage,
          tileX, tileY, this.tileSize, this.tileSize,             // Source
          position.x * this.tileSize, position.y * this.tileSize, // Destination
          this.tileSize, this.tileSize
        )
    };
  }
}
