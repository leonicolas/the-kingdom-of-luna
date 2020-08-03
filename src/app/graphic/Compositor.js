export default class Compositor {

  constructor() {
    this.layers = [];
  }

  addLayer(layer) {
    this.layers.push(layer);
  }

  update(detaTime, gameContext) {
    this.layers.forEach(layer => layer.update(detaTime, gameContext));
  }

  draw(context, camera) {
    this.layers.forEach(layer => layer.draw(context, camera));
  }
}
