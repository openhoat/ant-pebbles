define(require => {

  const _ = require('lodash');
  const PIXI = require('pixi');
  const helper = require('helper');
  const config = require('config');
  const Message = require('message');
  const Pebble = require('pebble');
  const Ant = require('ant');
  const EventEmitter = require('event-emitter');

  const game = {
    init(loader, renderer, resources) {
      this.loader = loader;
      this.renderer = renderer;
      this.textures = _.mapValues(config.textures, (texture, name) => Object.assign({}, texture, {resource: resources[name]}));
      this.container = new PIXI.Container();
      this.container.addChild(new PIXI.extras.TilingSprite(this.textures.sand.resource.texture, renderer.width, renderer.height));
      this.pause = _.noop;
      this.state = this.pause;
      this.initEventEmitter();
      this.initMessages();
      this.initSprites();
      this.initKeyboard();
      this.render();
      this.gameLoop();
    },
    initEventEmitter() {
      this.eventEmitter = new EventEmitter();
      this.eventEmitter.on('state', state => {
        if (state === 'pause') {
          this.state = this.pause;
          this.messages.win.visible = true;
        }
      });
    },
    initSprites(){
      this.pebbles = helper.createSprites(
        config.pebble,
        this.container,
        Pebble,
        [this.textures.pebble, this.textures.stone, this.textures.rock],
        this.renderer.view.width,
        this.renderer.view.height,
        this.eventEmitter
      );
      this.ants = helper.createSprites(
        config.ant,
        this.container,
        Ant,
        this.textures.ant,
        this.renderer.view.width,
        this.renderer.view.height,
        this.eventEmitter
      );
    },
    initMessages() {
      this.messages = _.mapValues({
        start: 'Press [space] to start the game!',
        resume: 'Press [space] to resume',
        win: 'You win!'
      }, text => new Message(
        config.messages,
        text,
        this.renderer.view.width,
        this.renderer.view.height
      ));
      _.forIn(this.messages, message => this.container.addChild(message));
      this.messages.start.visible = true;
    },
    initKeyboard() {
      this.keyControls = [];
      helper.addKeyControl(this.keyControls, [{
        code: 'Space',
        press: () => {
          if (this.state === this.play) {
            this.state = this.pause;
            this.messages.resume.visible = true;
          } else {
            this.state = this.play;
            this.messages.start.visible = false;
            this.messages.resume.visible = false;
          }
        }
      }, {
        code: 'ArrowRight',
        press: () => {
          config.ant.speed++;
          config.init();
          this.ants.forEach(ant => ant.refreshV());
        }
      }, {
        code: 'ArrowLeft',
        press: () => {
          config.ant.speed = Math.max(0, config.ant.speed - 1);
          config.init();
          this.ants.forEach(ant => ant.refreshV());
        }
      }, {
        code: 'ArrowUp',
        press: () => {
          const sprite = new Ant(
            `${Ant.name}${this.ants.length + 1}`,
            config.ant,
            this.textures.ant,
            this.renderer.view.width,
            this.renderer.view.height,
            this.eventEmitter
          );
          this.container.addChild(sprite);
          this.ants.push(sprite);
          config.ants = this.ants.length;
        }
      }, {
        code: 'ArrowDown',
        press: () => {
          if (this.ants.length < 2) {
            return;
          }
          const ant = this.ants.pop();
          ant.visible = false;
          this.container.addChild(ant);
          ant.dropPebbles();
          config.ants = this.ants.length;
        }
      }]);
      window.addEventListener('keydown', helper.keyHandler.bind(this, this.keyControls), false);
      window.addEventListener('keyup', helper.keyHandler.bind(this, this.keyControls), false);
    },
    render() {
      this.renderer.render(this.container);
    },
    play() {
      this.ants.forEach(ant => {
        ant.walk();
        if (ant.detectPebbles) {
          this.pebbles.forEach(pebble => {
            if (ant.isTouching(pebble)) {
              if (ant.pebbles.length >= ant.config.capacity) {
                ant.dropPebbles();
              } else {
                pebble.visible = false;
                ant.pebbles.push(pebble);
                if (ant.config.dropTimeout > 0) {
                  if (ant.dropTimeout) {
                    window.clearTimeout(ant.dropTimeout);
                  }
                  ant.dropTimeout = window.setTimeout(() => {
                    ant.dropPebbles();
                  }, ant.config.dropTimeout);
                }
              }
            }
          });
        }
        ant.checkEdges();
      });
    },
    gameLoop() {
      requestAnimationFrame(() => this.gameLoop());
      this.state();
      this.render();
    }
  };

  return game;

});