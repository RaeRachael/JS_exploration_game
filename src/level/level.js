import { turnIntoTiles } from '../tiles/tile.js';

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
  turnIntoTiles(level[levelNumber])
}

function getLevelNumber() {
  return levelNumber
}

turnIntoTiles(level[levelNumber])

function drawLevel(gameBox, tileMap, playerLocation) {
    tileMap.forEach(tile => {
        const offsetTileY = tile.yPos - playerLocation.y
        const offsetTileX = tile.xPos - playerLocation.x
        if (offsetTileY > -4 && offsetTileY < 4 && offsetTileX > -4 && offsetTileX < 4) {
            const tileDisplay = document.createElement('div')
            tileDisplay.style.gridRowStart = tile.yPos - playerLocation.y + 4
            tileDisplay.style.gridColumnStart = tile.xPos - playerLocation.x + 4
            tileDisplay.style.backgroundColor = tile.display
            gameBox.appendChild(tileDisplay)
        }
    });
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

export { drawLevel, drawGridOffset, setLevelNumber, getLevelNumber }