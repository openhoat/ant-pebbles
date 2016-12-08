define(require => {

  const _ = require('lodash');

  return {
    scene: {
      viewId: 'game-scene',
      backgroundColor: 0xf9f7d5
    },
    textures: {
      sand: {file: 'assets/images/sand.jpg'},
      ant: {file: 'assets/images/ant.png', orientation: Math.PI},
      stone: {file: 'assets/images/stone.png'},
      pebble: {file: 'assets/images/pebble.png'},
      rock: {file: 'assets/images/rock.png'}
    },
    ant: {
      quantity: 1,
      speed: 1,
      capacity: 5,
      pauseAfterTake: 1 * 1000
    },
    pebble: {
      quantity: 200,
      threshold: 5
    },
    messages: {
      start: {text: 'Press [space] to start the game!'},
      resume: {text: 'Press [space] to resume'},
      win: {text: 'You win!'},
      help: {
        text: `Help :

press [space] to pause/resume

[arrow right/left] to increase/decrease speed

[arrow up/down] to add/remove ants`,
        style: {fontSize: '18px'}
      },
      style: {
        align: 'center',
        fontFamily: 'Arial',
        fontSize: '36px',
        fontWeight: 'bold',
        fill: '#f7edca',
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
      }
    },
    init() {
      this.ant.edgeTimeout = 500 / this.ant.speed;
      this.ant.dropTimeout = Math.abs(30 * 1000 / (this.ant.speed / 10));
      _.forIn(_.omit(this.messages, 'style'), message => {
        message.style = Object.assign({}, this.messages.style, message.style);
      });
      return this;
    }
  }.init();

});