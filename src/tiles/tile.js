import { addMonster } from "../monster/monster.js"

var tileMap = []

function clearTileMap() {
  tileMap = []
}

function turnIntoTiles(levelData) {
  for (var y = 0; y < levelData.length; y ++) {
    for ( var x = 0; x <levelData[0].length; x ++) {
      tileMap.push(createTile(levelData[y][x], x, y))
    }
  }
  return tileMap
}

function getTileMap() {
  return tileMap
}

function createTile(string, x, y) {
  switch(string) {
    case "-":
      return new Wall(x, y)
    case " ":
      return new Floor(x, y)
    case "S":
      return new StairUp(x, y)
    case "D":
      return new StairDown(x, y)
    case "X":
      addMonster({x: x, y: y})
      return new Floor(x, y)
    case "|":
      return new DoorLocked(x, y)
    case "k":
      return new Key(x, y)
    default:
      return new Floor(x, y)
  }
}

class Tile {
  constructor(x, y) {
    this.xPos = x
    this.yPos = y
    this.text = ""
  }
}

class Floor extends Tile {
  constructor(x, y) {
    super(x, y)
    this.blocksPlayer = false
    this.display = "white"
  }
}

class Wall extends Tile {
  constructor(x, y) {
    super(x, y)
    this.blocksPlayer = true
    this.display = "black"
  }
}

class StairUp extends Tile {
  constructor(x, y) {
    super(x, y)
    this.blocksPlayer = false
    this.display = "yellow"
    this.levelChange = 1
    this.text = "up"
  }
}

class StairDown extends Tile {
  constructor(x, y) {
    super(x, y)
    this.blocksPlayer = false
    this.display = "yellow"
    this.levelChange = -1
    this.text = "down"
  }
}

class DoorLocked extends Tile {
  constructor(x, y) {
    super(x, y)
    this.blocksPlayer = true
    this.display = "brown"
    this.text = "locked"
  }
}

class Key extends Floor {
  constructor(x, y) {
    super(x, y)
    this.text = "key"
  }
}

export { createTile, turnIntoTiles, getTileMap, clearTileMap }
