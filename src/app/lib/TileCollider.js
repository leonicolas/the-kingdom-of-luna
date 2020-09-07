export default class TileCollider {

  constructor(entities, map) {
    this.entities = entities;
    this.map = map;
  }

  update() {
    this.entities.forEach(entity => {
      const futurePosition = entity.getFuturePosition()
      if(!futurePosition) {
        return;
      }

      const tile = this.map.getTile(futurePosition.x, futurePosition.y);
      if(tile && tile.isSolid) {
        entity.notifyCollision(tile);
      }
    });
  }
}
