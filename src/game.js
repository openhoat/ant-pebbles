import _ from 'lodash'
import * as PIXI from 'pixi.js'
import helper from './helper'
import config from './config'
import Message from './components/message'
import Pebble from './components/pebble'
import Ant from './components/ant'
import EventEmitter from './components/event-emitter'

const game = {
  init(loader, renderer, resources) {
    this.loader = loader
    this.renderer = renderer
    this.textures = _.mapValues(config.textures, (texture, name) => Object.assign({}, texture, {resource: resources[name]}))
    this.container = new PIXI.Container()
    this.container.addChild(new PIXI.extras.TilingSprite(this.textures.sand.resource.texture, renderer.width, renderer.height))
    this.initEventEmitter()
    this.initSprites()
    this.render()
    this.initMessages()
    this.state = this.stateStart
    this.gameLoop()
    this.initKeyboard()
  },
  initEventEmitter() {
    this.eventEmitter = new EventEmitter()
    this.eventEmitter.on('state', state => {
      if (state === 'win') {
        this.state = this.stateWin
      }
    })
  },
  initSprites() {
    this.pebbles = helper.createSprites(
      config.pebble,
      this.container,
      Pebble,
      [this.textures.pebble, this.textures.stone, this.textures.rock],
      this.renderer.view.width,
      this.renderer.view.height,
      this.eventEmitter
    )
    this.ants = helper.createSprites(
      config.ant,
      this.container,
      Ant,
      this.textures.ant,
      this.renderer.view.width,
      this.renderer.view.height,
      this.eventEmitter
    )
  },
  initMessages() {
    this.messages = _.mapValues(_.omit(config.messages, 'style'), message => new Message(
      message.text,
      message.style,
      this.renderer.view.width,
      this.renderer.view.height
    ))
    _.forIn(this.messages, message => this.container.addChild(message))
  },
  initKeyboard() {
    this.keyControls = []
    helper.addKeyControl(this.keyControls, [{
      code: 'Space',
      press: () => {
        if (this.state === this.statePlay) {
          this.state = this.statePause
        } else {
          this.state = this.statePlay
        }
      }
    }, {
      code: 'KeyH',
      press: () => {
        if (this.prevState) {
          this.state = this.prevState
          this.prevState = null
        } else {
          this.prevState = this.state
          this.state = this.stateHelp
        }
      }
    }, {
      code: 'ArrowRight',
      press: () => {
        config.ant.speed++
        config.init()
        this.ants.forEach(ant => ant.refreshV())
      }
    }, {
      code: 'ArrowLeft',
      press: () => {
        config.ant.speed = Math.max(0, config.ant.speed - 1)
        config.init()
        this.ants.forEach(ant => ant.refreshV())
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
        )
        this.container.addChild(sprite)
        this.ants.push(sprite)
        config.ants = this.ants.length
      }
    }, {
      code: 'ArrowDown',
      press: () => {
        if (this.ants.length < 2) {
          return
        }
        const ant = this.ants.pop()
        ant.visible = false
        this.container.addChild(ant)
        ant.dropPebbles()
        config.ants = this.ants.length
      }
    }])
    window.addEventListener('keydown', helper.keyHandler.bind(this, this.keyControls), false)
    window.addEventListener('keyup', helper.keyHandler.bind(this, this.keyControls), false)
  },
  render() {
    this.renderer.render(this.container)
  },
  showMessage(name) {
    _.forIn(this.messages, (message, messageName) => {
      message.visible = name === messageName
    })
  },
  stateStart() {
    this.showMessage('start')
  },
  stateHelp() {
    this.showMessage('help')
  },
  statePause() {
    this.showMessage('resume')
  },
  stateWin() {
    this.showMessage('win')
    this.ants.forEach(ant => ant.clearDropTimeout())
  },
  statePlay() {
    this.showMessage()
    this.ants.forEach(ant => {
      ant.walk()
    })
  },
  gameLoop() {
    requestAnimationFrame(() => this.gameLoop())
    this.state()
    this.render()
  }
}

export {game as default}
