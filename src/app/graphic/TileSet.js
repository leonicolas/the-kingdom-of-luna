import Vector from "./Vector";

export default class TileSet {
  constructor(tileSetSpec, tileSetImage) {
    this.tileSetSpec = tileSetSpec;
    this.tileSize = tileSetSpec.tileSize;
    this.tileSet = this._loadTileSet(tileSetImage);
  }

  _loadTileSet(tileSetImage) {
    return Object.keys(this.tileSetSpec.tiles)
      .reduce((map, tileName) => {
        const buffer = [false, true].map(flip => {
          const canvas = document.createElement('canvas');
          canvas.width = this.tileSize;
          canvas.height = this.tileSize;

          const tilePosition = this.tileSetSpec.tiles[tileName];
          const tileY = tilePosition[0] * this.tileSize;
          const tileX = tilePosition[1] * this.tileSize;
          const context = canvas.getContext('2d');

          if(flip) {
            context.scale(-1, 1);
            context.translate(-this.tileSize, 0);
          }

          context.drawImage(tileSetImage,
            tileX, tileY, this.tileSize, this.tileSize, // Source
            0, 0, this.tileSize, this.tileSize          // Destination
          );

          return canvas;
        });
        map.set(tileName, buffer);
        return map;
      }, new Map());
  }

  get(tileName) {
    const tile = this.tileSet.get(tileName);
    return {
      draw: (context, position, flip = false) => {
        context.drawImage(tile[flip ? 1 : 0],
          // Source
          0, 0, this.tileSize, this.tileSize,
          // Destination
          position.x * this.tileSize,
          position.y * this.tileSize,
          this.tileSize, this.tileSize
        );
      }
    };
  }
}
