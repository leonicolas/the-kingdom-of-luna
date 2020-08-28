import { Vector, Matrix } from '../lib/math';

export default class GameMap {
  constructor(mapSpec, tileSet) {
    this.width = mapSpec.width;
    this.height = mapSpec.height;
    this.terrain = this._expandTerrain(mapSpec, tileSet);
    this.foregroundObjects = this._indexObjects(mapSpec.foregroundObjects, tileSet);
    this.backgroundObjects = this._indexObjects(mapSpec.backgroundObjects, tileSet);
    this.defaultTerrainTile = tileSet.get(mapSpec.defaultTerrainTile);
  }

  background() {
    return {
      update: (deltatime) => this._update(deltatime),
      draw: (context, camera) => this._drawBackground(context, camera)
    };
  }

  foreground() {
    return {
      draw: (context, camera) => this._drawForeground(context, camera)
    };
  }

  _update() {
  }

  _drawForeground(context, camera) {
    this._drawObjects(context, camera, (mapPosition) => {
      const fgTiles = []

      // Add foreground object tile.
      const objectKey = this._getObjectIndex(mapPosition);
      if(this.foregroundObjects.has(objectKey)) {
        fgTiles.push(this.foregroundObjects.get(objectKey));
      }

      return fgTiles;
    });
  }

  _drawBackground(context, camera) {
    this._drawObjects(context, camera, (mapPosition) => {
        const bgTiles = [];

        // Add terrain tile.
        const tile = this.terrain.get(mapPosition.x, mapPosition.y);
        bgTiles.push(this._isOutOfBounds(mapPosition.x, mapPosition.y)
          ? this.defaultTerrainTile
          : tile || this.defaultTerrainTile
        );

        // Add background object tile.
        const objectKey = this._getObjectIndex(mapPosition);
        if(this.backgroundObjects.has(objectKey)) {
          bgTiles.push(this.backgroundObjects.get(objectKey));
        }

        return bgTiles;
    });
  }

  _drawObjects(context, camera, drawCallback) {
    for(let y = 0; y < camera.viewport.height; y++) {
      for(let x = 0; x < camera.viewport.width; x++) {
        const mapPosition = new Vector(x + camera.position.x, y + camera.position.y);
        drawCallback(mapPosition)
          .forEach(tile => tile.draw(context, x, y));
      }
    }
  }

  _isOutOfBounds(x, y) {
    return x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1;
  }

  _indexObjects(objectsList, tileSet) {
    return objectsList.reduce((map, tileData) => {
      const [tileName, x, y] = tileData;
      const objIndex = this._getObjectIndex(new Vector(x, y));
      map.set(objIndex, tileSet.get(tileName));
      return map;
    }, new Map());
  }

  _expandTerrain(mapSpec, tileSet) {
    let x = 0, y = 0;
    return mapSpec.terrain.reduce((terrainMatrix, tile) => {
      const isPattern = Array.isArray(tile);
      const tileName = isPattern ? tile[0] : tile;
      const quantity = isPattern ? tile[1] || mapSpec.width : 1;
      const currentTile = tileSet.get(tileName);

      for(let i = 0; i < quantity; i++) {
        terrainMatrix.put(x++, y, currentTile);
        if(x === this.width) {
          x = 0;
          y++;
        }
      }
      return terrainMatrix;
    }, new Matrix());
  }

  _getObjectIndex(position) {
    return `${position.x}-${position.y}`;
  }
}
