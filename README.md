# Ant pebbles

A JS simulation of ant behavior and pebbles in the browser

## Installation

```
$ npm install
```

or

```
$ yarn
```


## Usage

Just open index.html into your browser

## Game rules

- Pebbles, stones and rocks are placed randomly into the sand background game scene, the number of pebbles is set in config.js
- An ant is also placed randomly : the initial number of ants is set in config.js, and you can change it in live with up and down arrow keys
- When the game starts the ants start walking
- When an ant touch a pebble, it brings it
- When an ant has reached its maximum capacity, it drops all its pebbles at the current place, change of direction and start walking again
- If an ant has just dropped its pebbles, there is a short time during it cannot take new pebble (dropTimeout)

You win when all the pebbles are placed into only one heap.

Enjoy!
