import { turnIntoTiles, getTileMap, selectTileMap } from '../tiles/tile.js'
import { addMonster } from '../monster/monster.js'
import { getLevelData} from './levelData.js'
import { displayTransition } from '../main.js'

var levelNumber = 1

const level = getLevelData()

function setLevelNumber(newNumber) {
  levelNumber = newNumber
  selectTileMap(levelNumber)
  includeMonsters()
  displayTransition()
}

function getLevelNumber() {
  return levelNumber
}

function loadLevelsAsTiles() {
  turnIntoTiles(level)
}

function includeMonsters() {
  var currentLevel = level[levelNumber-1]
  for (var y = 0; y < currentLevel.length; y ++) {
    for ( var x = 0; x <currentLevel[0].length; x ++) {
      if (currentLevel[y][x] === "X" )
      addMonster({x: x, y: y})
    }
  }
}

function isTileTreasure(location) {
  var tile = findTile(location)
  return tile.text === "gold"
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
  if (direction === "blocked") {
    levelShift.className = 'blocked'
  }
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

export { drawLevel,
   drawGridOffset, 
   setLevelNumber, 
   getLevelNumber, 
   loadLevelsAsTiles,  
   findTile, 
   isTileTreasure, 
   includeMonsters }