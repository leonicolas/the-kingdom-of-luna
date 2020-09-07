export default class Collition {

  constructor(entity) {
    entity.collided = this._collided(entity);
  }

  _collided(entity) {
    return (candidate) => {
      entity.velocity.set(0, 0);
    }
  }
}
