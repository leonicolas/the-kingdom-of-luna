export default class Tile {

  constructor(tileData, tileSetImage) {
    this.size = tileData.size;
    this.buffers = this._createBuffer(tileData, tileSetImage);
  }

  _createBuffer(tileData, tileSetImage) {
    return [false, true].map(flip => {
      const buffer = document.createElement('canvas');
      buffer.width = this.size;
      buffer.height = this.size;

      const tileX = tileData[0] * this.size;
      const tileY = tileData[1] * this.size;
      const context = buffer.getContext('2d');

      if(flip) {
        context.scale(-1, 1);
        context.translate(-this.size, 0);
      }

      context.drawImage(tileSetImage,
        tileX, tileY, this.size, this.size, // Source
        0, 0, this.size, this.size          // Destination
      );

      return buffer;
    });
  }


  draw(context, x, y, flip = false) {
    context.drawImage(this.buffers[flip ? 1 : 0],
      // Source
      0, 0, this.size, this.size,
      // Destination
      x * this.size, y * this.size,
      this.size, this.size
    );
  }
}
