import Vector from './Vector';
import { calcIndex } from '../lib/math';
import { loadAnimations } from '../lib/loaders';

export default class GameMap {
  constructor(mapSpec, tileSet, mapName) {
    this.tileSet = tileSet;
    this.mapSpec = mapSpec[mapName];
    this.mapName = mapName;
    this.animations = loadAnimations(tileSet, this.mapSpec.animations);
  }

  update(deltaTime) {
    Object.values(this.animations).forEach(animation => animation.update(deltaTime));
  }

  draw(context) {
    const tileSize = this.tileSet.tileSize;
    const map = this.mapSpec;

    for(let y = 0; y < map.height; y++) {
      for(let x = 0; x < map.width; x++) {
        const tileName = map.tiles[calcIndex(x, y, map.width)] || map.defaultTile;
        const position = new Vector(x * tileSize, y * tileSize);
        const currentTile = this.animations[tileName]
          ? this.animations[tileName]
          : this.tileSet.get(tileName);
        currentTile.draw(context, position);
      }
    }
  }
}
