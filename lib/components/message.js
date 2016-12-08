define(require => {

  const PIXI = require('pixi');

  class Message extends PIXI.Text {
    constructor(text, style, maxWidth, maxHeight) {
      super(text, style);
      this.x = (maxWidth - this.width) / 2;
      this.y = (maxHeight - this.height) / 2;
      this.visible = false;
    }
  }

  return Message;

});