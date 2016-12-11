import {loader, autoDetectRenderer} from 'pixi.js'
import _ from 'lodash'
import config from './config'
import game from './game'

_.forIn(config.textures, (texture, name) => loader.add(name, texture.file))
const gameView = document.getElementById(config.scene.viewId)
const renderer = autoDetectRenderer(256, 256, {view: gameView})
renderer.view.style.position = 'absolute'
renderer.view.style.display = 'block'
renderer.autoResize = true
renderer.backgroundColor = config.scene.backgroundColor
renderer.resize(window.innerWidth, window.innerHeight)
if (!gameView) {
  document.body.appendChild(renderer.view)
}
loader.load((loader, resources) => game.init(loader, renderer, resources))
