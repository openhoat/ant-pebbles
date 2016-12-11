import {Text} from 'pixi.js'

class Message extends Text {
  constructor(text, style, maxWidth, maxHeight) {
    super(text, style)
    this.x = (maxWidth - this.width) / 2
    this.y = (maxHeight - this.height) / 2
    this.visible = false
  }
}

export {Message as default}
