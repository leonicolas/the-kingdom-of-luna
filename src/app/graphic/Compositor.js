export default class Compositor {

  constructor() {
    this.objects = new Set();
  }

  addLayer(layer) {
    this.objects.add(layer);
  }

  addObject(object) {
    this.objects.add(object);
  }

  update(detaTime, gameContext) {
    this.objects.forEach(object => object.update && object.update(detaTime, gameContext));
  }

  draw(context, camera) {
    this.objects.forEach(object => object.draw && object.draw(context, camera));
  }
}
