define(require => {

  const Sprite = require('sprite');

  class Pebble extends Sprite {
    constructor(...args) {
      super(...args);
      Pebble.distance = Pebble.distance || Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
      Pebble.threshold = Pebble.threshold || this.config.threshold;
      Pebble.eventEmitter = Pebble.eventEmitter || this.eventEmitter;
      Pebble.instances = Pebble.instances || [];
      Pebble.instances.push(this);
    }

    static checkMaxDistance() {
      const pebbles = Pebble.instances.filter(pebble => pebble.visible);
      let maxDistance = 0;
      pebbles.forEach(pebble => {
        pebbles.forEach(other => {
          if (other !== pebble) {
            maxDistance = Math.max(maxDistance, Math.floor(Math.sqrt(Math.pow(pebble.getDistanceX(other), 2) + Math.pow(pebble.getDistanceY(other), 2))));
          }
        });
      });
      const close = maxDistance < Pebble.distance * (1 + pebbles.length * Pebble.threshold / 100);
      if (close) {
        Pebble.eventEmitter.emit('state', 'win');
      }
    }
  }

  return Pebble;

});