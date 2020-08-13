
var tileMap = []

function clearTileMap() {
  tileMap = []
}

function turnIntoTiles(levelData) {
  console.log("called")
  for (var y = 0; y < levelData.length; y ++) {
    for ( var x = 0; x <levelData[0].length; x ++) {
      tileMap.push(createTile(levelData[y][x], x, y))
    }
  }
  console.log(tileMap)
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
    default:
      return new Tile(x, y)
  }
}

class Tile {
  constructor(x, y) {
    this.xPos = x
    this.yPos = y
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
  }
}

class StairDown extends Tile {
  constructor(x, y) {
    super(x, y)
    this.blocksPlayer = false
    this.display = "green"
    this.levelChange = -1
  }
}

export { createTile, turnIntoTiles, getTileMap, clearTileMap }
