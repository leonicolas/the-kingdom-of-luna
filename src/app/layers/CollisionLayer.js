export default class CollisionNotifier {

  constructor(entities, gamemap) {
    this.entities = entities;
    this.gamemap = gamemap;
  }

  update() {
    this.entities.forEach(subject => {
      if(!subject.collided) {
        return;
      }

      const position = subject.getFuturePosition();
      const tile = this.gamemap.getTile(position.x, position.y);
      if(tile && tile.isSolid()) {
        subject.collided(tile);
        return;
      }

      this.entities.forEach(candidate => {
        if(subject === candidate) {
          return;
        }
      });
    });
  }
}
