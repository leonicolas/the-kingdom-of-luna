import Vector from './Vector';
import { getIndexFromXY } from '../lib/math';
import { loadAnimations } from '../lib/loaders';

export default class GameMap {
  constructor(mapSpec, tileSet) {
    this.tileSet = tileSet;
    this.width = mapSpec.width;
    this.height = mapSpec.height;

    this.animations = loadAnimations(tileSet, mapSpec.animations);
    this.terrain = this._expandTerrain(mapSpec, tileSet);
    this.objects = this._indexObjects(mapSpec, tileSet);

    this.defaultTerrainTile =
      this.animations.get(mapSpec.defaultTerrainTile) ||
      this.tileSet.get(mapSpec.defaultTerrainTile);
  }

  update(deltaTime) {
    this.animations.forEach(animation => {
      animation.update(deltaTime);
    });
  }

  draw(context, camera) {
    for(let y = 0; y < camera.viewport.height; y++) {
      for(let x = 0; x < camera.viewport.width; x++) {
        const mapX = x + camera.position.x;
        const mapY = y + camera.position.y;
        const index = getIndexFromXY(mapX, mapY, this.width);

        const currentTile = this._isOutOfBounds(mapX, mapY)
          ? this.defaultTerrainTile
          : this.terrain[index] || this.defaultTerrainTile;
        currentTile.draw(context, new Vector(x, y));

        const objectKey = this._getObjectIndex(mapX, mapY);
        if(this.objects.has(objectKey)) {
          this.objects.get(objectKey).draw(context, new Vector(x, y));
        }
      }
    }
  }

  _isOutOfBounds(x, y) {
    return x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1;
  }

  _indexObjects(mapSpec, tileSet) {
    return mapSpec.objects.reduce((map, tileData) => {
      const tileName = tileData[0];
      const objIndex = this._getObjectIndex(tileData[1], tileData[2]);
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

  _getObjectIndex(x, y) {
    return `${x}-${y}`;
  }
}
