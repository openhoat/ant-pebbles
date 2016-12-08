({
  baseUrl: 'lib',
  name: 'almond',
  include: ['main'],
  insertRequire: ['main'],
  out: 'build/app.js',
  wrap: true,
  zdir: 'build',
  paths: {
    almond: '../node_modules/almond/almond',
    pixi: '../node_modules/pixi.js/dist/pixi',
    lodash: '../node_modules/lodash/lodash.min',
    'event-emitter': 'components/event-emitter',
    message: 'components/message',
    sprite: 'components/sprite',
    ant: 'components/ant',
    pebble: 'components/pebble'
  }
})