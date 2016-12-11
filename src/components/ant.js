import Sprite from './sprite'
import Pebble from './pebble'

class Ant extends Sprite {
  constructor(...args) {
    super(...args)
    this.pebbles = []
    this.detectPebbles = true
    this.refreshV()
  }

  refreshV() {
    this.vx = Math.cos(this.orientation + this.rotation) * this.config.speed
    this.vy = Math.sin(this.orientation + this.rotation) * this.config.speed
    return this
  }

  changeDirection(rotation) {
    this.vx = this.vy = 0
    window.setTimeout(() => {
      this.rotation = rotation
      this.refreshV()
    }, this.config.edgeTimeout)
  }

  checkEdges() {
    if (this.x > this.maxWidth - this.width) {
      this.x = this.maxWidth - this.width
      this.changeDirection((this.rotation + Math.random() * Math.PI) % (2 * Math.PI))
    } else if (this.x < this.width) {
      this.x = this.width
      this.changeDirection((this.rotation + Math.random() * Math.PI) % (2 * Math.PI))
    } else if (this.y < this.height) {
      this.y = this.height
      this.changeDirection((this.rotation + Math.random() * Math.PI) % (2 * Math.PI))
    } else if (this.y > this.maxHeight - this.height) {
      this.y = this.maxHeight - this.height
      this.changeDirection((this.rotation + Math.random() * Math.PI) % (2 * Math.PI))
    }
  }

  isTouching(other) {
    const width = Math.floor((this.width + other.width) / 2)
    const height = Math.floor((this.height + other.height) / 2)
    const distanceX = this.getDistanceX(other)
    const distanceY = this.getDistanceY(other)
    return this.visible && other.visible && distanceX < width && distanceY < height
  }

  dropPebbles() {
    this.detectPebbles = false
    setTimeout(() => {
      this.detectPebbles = true
    }, this.config.pauseAfterTake)
    this.pebbles.forEach(pebble => {
      pebble.x = Math.max(
        pebble.width,
        Math.min(
          this.maxWidth - pebble.width,
          this.getCenterX() - Math.floor(this.vx * Math.random() / 2)
        )
      )
      pebble.y = Math.max(
        pebble.height,
        Math.min(
          this.maxHeight - pebble.height,
          this.getCenterY() - Math.floor(this.vy * Math.random() / 2)
        )
      )
      pebble.visible = true
    })
    this.setRandomDirection()
    this.refreshV()
    this.pebbles.length = 0
    Pebble.checkMaxDistance()
  }

  clearDropTimeout() {
    if (this.dropTimeout) {
      window.clearTimeout(this.dropTimeout)
    }
    this.dropTimeout = null
  }

  walk() {
    super.walk()
    if (this.detectPebbles) {
      Pebble.instances.filter(pebble => pebble.visible).forEach(pebble => {
        if (this.isTouching(pebble)) {
          if (this.pebbles.length >= this.config.capacity) {
            this.dropPebbles()
          } else {
            pebble.visible = false
            this.pebbles.push(pebble)
            if (this.config.dropTimeout > 0) {
              this.clearDropTimeout()
              this.dropTimeout = window.setTimeout(() => {
                this.dropPebbles()
              }, this.config.dropTimeout)
            }
          }
        }
      })
    }
    this.checkEdges()
  }
}

export {Ant as default}
