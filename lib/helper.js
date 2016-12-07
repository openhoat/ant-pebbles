define(() => {

  const _ = require('lodash');

  const helper = {
    randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    randomElt: ar => Array.isArray(ar) ? ar[helper.randomInt(0, ar.length - 1)] : ar,
    createSprites: (config, container, SpriteClass, ...args) => {
      const sprites = Array.from(
        new Array(config.quantity),
        (item, index) => new SpriteClass(`${SpriteClass.name}${index + 1}`, config, ...args)
      );
      sprites.forEach(sprite => container.addChild(sprite));
      return sprites;
    },
    addKeyControl: (keyControls, keyControl) => {
      if (Array.isArray(keyControl)) {
        keyControl.forEach(keyControl => helper.addKeyControl(keyControls, keyControl));
        return;
      }
      const keyControlInitialState = {down: false};
      keyControls.push(Object.assign(keyControl, keyControlInitialState));
    },
    keyHandler: (keyControls, event) => {
      const keyControl = _.find(keyControls, {keyCode: event.keyCode}) ||
        _.find(keyControls, {key: event.key}) ||
        _.find(keyControls, {code: event.code});
      if (!keyControl) {
        return;
      }
      if (event.type === 'keydown') {
        if (!keyControl.down && typeof keyControl.press === 'function') {
          keyControl.press();
        }
        keyControl.down = true;
        event.preventDefault();
      } else if (event.type === 'keyup') {
        if (keyControl.down && typeof keyControl.release === 'function') {
          keyControl.release();
        }
        keyControl.down = false;
        event.preventDefault();
      }
    }
  };

  return helper;

});