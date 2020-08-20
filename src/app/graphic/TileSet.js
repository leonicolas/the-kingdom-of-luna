export default class TileSet {
  constructor(tileSetSpec, tileSetImage) {
    this.tileSetSpec = tileSetSpec;
    this.tileSize = tileSetSpec.tileSize;
    this.tileSet = this._loadTileSet(tileSetImage);
  }

  _loadTileSet(tileSetImage) {
    return Object.keys(this.tileSetSpec.tiles)
      .reduce((map, tileName) => {
        const buffer = this._createBuffer(tileName, tileSetImage);
        map.set(tileName, buffer);
        return map;
      }, new Map());
  }

  _createBuffer(tileName, tileSetImage) {
    return [false, true].map(flip => {
      const buffer = document.createElement('canvas');
      buffer.width = this.tileSize;
      buffer.height = this.tileSize;

      const tilePosition = this.tileSetSpec.tiles[tileName];
      const tileX = tilePosition[0] * this.tileSize;
      const tileY = tilePosition[1] * this.tileSize;
      const context = buffer.getContext('2d');

      if(flip) {
        context.scale(-1, 1);
        context.translate(-this.tileSize, 0);
      }

      context.drawImage(tileSetImage,
        tileX, tileY, this.tileSize, this.tileSize, // Source
        0, 0, this.tileSize, this.tileSize          // Destination
      );

      return buffer;
    });
  }

  get(tileName) {
    const tile = this.tileSet.get(tileName);
    return {
      draw: (context, x, y, flip = false) => {
        context.drawImage(tile[flip ? 1 : 0],
          // Source
          0, 0, this.tileSize, this.tileSize,
          // Destination
          x * this.tileSize,
          y * this.tileSize,
          this.tileSize, this.tileSize
        );
      }
    };
  }
}
