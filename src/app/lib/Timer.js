export default class Timer {
  constructor(frameRate = 60) {
    let lastTime = 0;
    let deltaTime = 1000 / frameRate;

    this.updateProxy = time => {
      const elapsed = time - lastTime;
      if(elapsed > deltaTime) {
        lastTime = time;
        this.update(elapsed / 1000);
      }

      // Request next frame.
      if(!this.paused) {
        this.enqueue();
      }
    }
  }

  enqueue() {
    requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.paused = false;
    this.enqueue();
  }

  pause() {
    this.paused = true;
  }
}
