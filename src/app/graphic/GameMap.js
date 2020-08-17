import Vector from './Vector';
import { getIndexFromPosition } from '../lib/math';
import { loadAnimations } from '../lib/loaders';

export default class GameMap {
  constructor(mapSpec, tileSet) {
    this.tileSet = tileSet;
    this.width = mapSpec.width;
    this.height = mapSpec.height;

    this.animations = loadAnimations(tileSet, mapSpec.animations);
    this.terrain = this._expandTerrain(mapSpec, tileSet);
    this.foregroundObjects = this._indexObjects(mapSpec.foregroundObjects, tileSet);
    this.backgroundObjects = this._indexObjects(mapSpec.backgroundObjects, tileSet);

    this.defaultTerrainTile =
      this.animations.get(mapSpec.defaultTerrainTile) ||
      this.tileSet.get(mapSpec.defaultTerrainTile);
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

  _update(deltaTime) {
    this.animations.forEach(animation => {
      animation.update(deltaTime);
    });
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
    this._drawObjects(context, camera, (mapPosition, tileIndex) => {
        const bgTiles = [];

        // Add terrain tile.
        bgTiles.push(this._isOutOfBounds(mapPosition.x, mapPosition.y)
          ? this.defaultTerrainTile
          : this.terrain[tileIndex] || this.defaultTerrainTile
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
        const cameraPosition = new Vector(x, y);
        const mapPosition = new Vector(x + camera.position.x, y + camera.position.y);
        const tileIndex = getIndexFromPosition(mapPosition, this.width);
        drawCallback(mapPosition, tileIndex)
          .forEach(tile => tile.draw(context, cameraPosition));
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
    return mapSpec.terrain.reduce((expandedTerrain, tile) => {
      const isPattern = Array.isArray(tile);
      const tileName = isPattern ? tile[0] : tile;
      const quantity = isPattern ? tile[1] || mapSpec.width : 1;
      const currentTile =
        this.animations.get(tileName) ||
        this.tileSet.get(tileName);

      for(let i = 0; i < quantity; i++) {
        expandedTerrain.push(currentTile);
      }
      return expandedTerrain;
    }, []);
  }

  _getObjectIndex(position) {
    return `${position.x}-${position.y}`;
  }
}
