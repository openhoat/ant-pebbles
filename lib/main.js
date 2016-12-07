define(require => {

  const PIXI = require('pixi');
  const _ = require('lodash');
  const config = require('config');
  const game = require('game');
  const loader = PIXI.loader;

  _.forIn(config.textures, (texture, name) => loader.add(name, texture.file));
  const gameView = document.getElementById(config.scene.viewId);
  const renderer = PIXI.autoDetectRenderer(256, 256, {view: gameView});
  renderer.view.style.position = 'absolute';
  renderer.view.style.display = 'block';
  renderer.autoResize = true;
  renderer.backgroundColor = config.scene.backgroundColor;
  renderer.resize(window.innerWidth, window.innerHeight);
  if (!gameView) {
    document.body.appendChild(renderer.view);
  }
  loader
  //.add(_.values(config.textures).map(texture => texture.file))
    .load((loader, resources) => game.init(loader, renderer, resources));

});