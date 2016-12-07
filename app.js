require.config({
  baseUrl: 'lib',
  paths: {
    pixi: '../node_modules/pixi.js/dist/pixi',
    lodash: '../node_modules/lodash/lodash.min',
    'event-emitter': 'components/event-emitter',
    message: 'components/message',
    sprite: 'components/sprite',
    ant: 'components/ant',
    pebble: 'components/pebble'
  }
})(['main']);