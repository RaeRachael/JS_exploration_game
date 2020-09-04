var tileMap = []
var tileLevel = []

function turnIntoTiles(levelData) {
  levelData.forEach(level => {
    var tiles = []
    for (var y = 0; y < level.length; y ++) {
      for ( var x = 0; x <level[0].length; x ++) {
        tiles.push(createTile(level[y][x], x, y))
      }
    }
    tileMap.push(tiles)
  })
  return tileMap
}

function selectTileMap(levelNumber) {
  tileLevel = tileMap[levelNumber - 1]
  return tileLevel
}

function getTileMap() {
  return tileLevel
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
    case "|":
      return new DoorLocked(x, y)
    case "k":
      return new Key(x, y)
    case "t":
      return new Treasure(x, y)
    default:
      return new Floor(x, y)
  }
}

function openLockedDoor(tile) {
  tile.blocksPlayer = false
  tile.text = "open"
}

function removeKey(tile) {
  tile.text = " "
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

class Treasure extends Floor {
  constructor(x, y) {
    super(x, y)
    this.display = "silver"
    this.text = "gold"
  }
}

export { createTile, turnIntoTiles, selectTileMap, getTileMap, openLockedDoor, removeKey }
