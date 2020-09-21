import constants from '../constants';

export default class WindowLayer {
  constructor(windowSpec, tileSet) {
    this.visible = false;
    this.buffer = this._createBuffer();

    const context = this.buffer.getContext('2d');
    tileSet.get('window-01-tc').draw(context, 2, 2);
    for(let x = 3; x < 27; x++)
      tileSet.get('window-01-t').draw(context, x, 2);
    tileSet.get('window-01-tc').draw(context, 27, 2, true);

    for(let y = 3; y < 17; y++) {
      tileSet.get('window-01-s').draw(context, 2, y);
      for(let x = 3; x < 27; x++)
        tileSet.get('window-01-i').draw(context, x, y);
      tileSet.get('window-01-s').draw(context, 27, y, true);
    }

    tileSet.get('window-01-bc').draw(context, 2, 17);
    for(let x = 3; x < 27; x++)
      tileSet.get('window-01-b').draw(context, x, 17);
    tileSet.get('window-01-bc').draw(context, 27, 17, true);
  }

  update() {
    if(!this.visible) {
      return;
    }
  }

  draw(context) {
    if(!this.visible) {
      return;
    }
    context.drawImage(this.buffer, 0, 0, this.buffer.width, this.buffer.height);
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  toggle() {
    this.visible = !this.visible;
  }

  _createBuffer() {
    const buffer = document.createElement('canvas');
    buffer.width = constants.WIDTH;
    buffer.height = constants.HEIGHT;
    return buffer;
  }
}
