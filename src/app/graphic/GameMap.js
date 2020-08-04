import Vector from './Vector';
import { calcIndex } from '../lib/math';
import { loadAnimations } from '../lib/loaders';

export default class GameMap {
  constructor(mapSpec, tileSet) {
    this.tileSet = tileSet;
    this.mapSpec = this._expand(mapSpec);
    this.animations = loadAnimations(tileSet, this.mapSpec.animations);
    console.log(this.mapSpec);
  }

  update(deltaTime) {
    Object.values(this.animations).forEach(animation => animation.update(deltaTime));
  }

  _expand(mapSpec) {
    const expandedSpec = Object.assign({}, mapSpec);
    expandedSpec.tiles = [];
    mapSpec.tiles.forEach(tile => {
      const isPatter = Array.isArray(tile);
      const tileName = isPatter ? tile[0] : tile;
      const repetition = isPatter ? tile[1] || mapSpec.width : 1;
      for(let i = 0; i < repetition; i++) {
        // TODO: Remove this temporary grass randomization
        if(tileName === 'grass-1' && Math.random() < 0.2) {
          expandedSpec.tiles.push('grass-2');
        } else {
          expandedSpec.tiles.push(tileName);
        }
      }
    });
    return expandedSpec;
  }

  draw(context, camera) {
    for(let y = 0; y < camera.viewport.height; y++) {
      for(let x = 0; x < camera.viewport.width; x++) {
        const tileName = this._getTileName(camera, x, y);
        const currentTile = this.animations[tileName]
          ? this.animations[tileName]
          : this.tileSet.get(tileName);
        const position = new Vector(x, y);
        currentTile.draw(context, position);
      }
    }
  }

  _getTileName(camera, x, y) {
    x = x + camera.position.x;
    y = y + camera.position.y;
    if(x < 0 || x >= this.mapSpec.width ||
       y < 0 || y >= this.mapSpec.height) {
      return this.mapSpec.defaultTile;
    }

    const index = calcIndex(x, y, this.mapSpec.width);
    return this.mapSpec.tiles[index] || this.mapSpec.defaultTile;
  }
}
