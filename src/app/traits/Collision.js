export default class Collition {

  constructor(entity, collisionCallback) {
    this.collisionCallback = collisionCallback;
    entity.collided = this._collided();
  }

  _collided() {
    return (candidate) => {
      this.collisionCallback(candidate);
    }
  }
}
