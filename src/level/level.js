import { turnIntoTiles, clearTileMap, getTileMap } from '../tiles/tile.js'
import { setUpLevel } from "../main.js"
import { playerLocation } from '../player/player.js'

var levelNumber = 0

const level = [
["-----------",
"- -       -",
"- - ----- -",
"- - -     -",
"- - - -----",
"-   -    S-",
"-----------"],
["-----------",
"-         -",
"-   X     -",
"-         -",
"- --- -----",
"-  S-    D-",
"-----------"]]

function setLevelNumber(newNumber) {
  levelNumber = newNumber
  setUpLevel()
}

function getLevelNumber() {
  return levelNumber
}

function levelLoad() {
  clearTileMap()
  turnIntoTiles(level[levelNumber])
}

function findTile(location) {
  var correctTile
  getTileMap().forEach(function(tile) {
    if (tile.xPos === location.x && tile.yPos === location.y) {
      correctTile = tile
    }
  })
  return correctTile
}

function drawLevel(gameBox, tileMap, playerLocation) {
  tileMap.forEach(tile => {
    const offsetTileY = tile.yPos - playerLocation.y
    const offsetTileX = tile.xPos - playerLocation.x
    if (offsetTileY > -4 && offsetTileY < 4 && offsetTileX > -4 && offsetTileX < 4) {
      displayOneTile(gameBox, tile, { x: offsetTileX + 4, y: offsetTileY + 4 })
    }
  });
}

function displayOneTile(gameBox, tile, position) {
  const tileDisplay = document.createElement('div')
  tileDisplay.style.gridRowStart = position.y
  tileDisplay.style.gridColumnStart = position.x
  tileDisplay.style.backgroundColor = tile.display
  tileDisplay.innerHTML = tile.text
  gameBox.appendChild(tileDisplay)
}

function drawGridOffset(direction, step) {
  let levelShift = document.getElementById('gamebox-offset')
  if (direction.x === -1 && direction.y === 0) {
    levelShift.className = `left-${step}`
  }
  if (direction.x === 0 && direction.y === -1) {
    levelShift.className = `up-${step}`
  }
  if (direction.x === 1 && direction.y === 0) {
    levelShift.className = `right-${step}`
  }
  if (direction.x === 0 && direction.y === 1) {
    levelShift.className = `down-${step}`
  }
}

export { drawLevel, drawGridOffset, setLevelNumber, getLevelNumber, levelLoad, findTile }