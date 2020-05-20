export default class Timer {
  constructor(deltaTime = 1 / 60) {
    let lastTime = 0
    let accumulatedTime = 0

    this.updateProxy = time => {
      accumulatedTime += (time - lastTime) / 1000

      while (accumulatedTime > deltaTime) {
        if (this.update) this.update(deltaTime)
        accumulatedTime -= deltaTime
      }
      lastTime = time
      if(!this.paused) {
        this.enqueue()
      }
    }
  }

  enqueue() {
    requestAnimationFrame(this.updateProxy)
  }

  start() {
    this.paused = false
    this.enqueue()
  }

  pause() {
    this.paused = true
  }
}
