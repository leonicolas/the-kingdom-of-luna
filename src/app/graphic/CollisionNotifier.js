export default class CollisionNotifier {

  constructor(entities, gamemap) {
    this.entities = entities;
    this.gamemap = gamemap;
  }

  update() {
    this.entities.forEach(subject => {
      const futureX = subject.position.x + subject.velocity.x;
      const futureY = subject.position.y + subject.velocity.y;
      const tile = this.gamemap.getTile(futureX, futureY);

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
