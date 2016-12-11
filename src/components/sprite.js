import {Sprite as PixiSprite} from 'pixi.js'
import helper from '../helper'

class Sprite extends PixiSprite {
  constructor(name, config, texture, maxWidth, maxHeight, eventEmitter) {
    super()
    this.name = name
    this.config = config
    this.texture = helper.randomElt(texture).resource.texture
    this.orientation = texture.orientation || 0
    this.maxWidth = maxWidth
    this.maxHeight = maxHeight
    this.eventEmitter = eventEmitter
    this.anchor.x = 0.5
    this.anchor.y = 0.5
    this.setRandomPlace()
    this.setRandomDirection()
  }

  setRandomPlace() {
    const xOffset = this.width
    const yOffset = this.height
    const xSize = this.maxWidth - this.width - xOffset * 2
    const ySize = this.maxHeight - this.height - yOffset * 2
    this.position.set(
      helper.randomInt(xOffset, xSize + xOffset),
      helper.randomInt(yOffset, ySize + yOffset)
    )
    return this
  }

  setRandomDirection() {
    this.rotation = Math.random() * 2 * Math.PI
    return this
  }

  getCenterX() {
    return Math.floor(this.x + this.width / 2)
  }

  getCenterY() {
    return Math.floor(this.y + this.height / 2)
  }

  getDistanceX(other) {
    return Math.abs(Math.floor(this.getCenterX() - (typeof other === 'number' ? other : other.getCenterX())))
  }

  getDistanceY(other) {
    return Math.abs(Math.floor(this.getCenterY() - (typeof other === 'number' ? other : other.getCenterY())))
  }

  walk() {
    this.x += this.vx
    this.y += this.vy
  }

  toString() {
    return `${this.name}(${this.x}, ${this.y})`
  }
}

export {Sprite as default}
