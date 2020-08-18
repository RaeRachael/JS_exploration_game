import { getLevelNumber, setLevelNumber } from "../level/level.js"
import { isMonsterThere } from "../monster/monster.js"

const PLAYER_MOVEMENT_SPEED = 5
var playerLocation = { x: 1, y: 1 }

function setPlayerLocation(location) {
    playerLocation = location
}

function updatePlayer(playerDirection, pressed, tileMap) {
  if (pressed === true) {
    const possibleNewlocation = {
      x: playerLocation.x + playerDirection.x,
      y: playerLocation.y + playerDirection.y
    }
    if ( tileBlocked(possibleNewlocation, tileMap) === false ) {
      playerLocation.x = possibleNewlocation.x
      playerLocation.y = possibleNewlocation.y
      checkForStairs(playerLocation, tileMap)
    }
  }
}

function checkForStairs(location, tileMap) {
  var levelNumber = getLevelNumber()
  tileMap.forEach(function(tile) {
    if (tile.xPos === location.x && tile.yPos === location.y) {
      if( tile.levelChange ) {
        levelNumber += tile.levelChange
        setLevelNumber(levelNumber)
      }
    }
  });
}

function checkBlocked(playerDirection, tileMap){
  return tileBlocked(getPossibleLocation(playerDirection), tileMap)
}

function checkMonster(playerDirection) {
  return isMonsterThere(getPossibleLocation(playerDirection))
}

function getPossibleLocation(playerDirection) {
  return  {
    x: playerLocation.x + playerDirection.x,
    y: playerLocation.y + playerDirection.y
  }
}

function tileBlocked(location, tileMap) {
  var output
  tileMap.forEach(function(tile) {
    if (tile.xPos === location.x && tile.yPos === location.y) {
      output = tile.blocksPlayer
    }
  });
  return output
}

function drawPlayer(playerDirection, step) {
  const playerSpace = document.getElementById('player')
  if (playerDirection.x === -1 && playerDirection.y === 0) {
    playerSpace.className = `left step-${step}`
  }
  if  (playerDirection.x === 0 && playerDirection.y === -1) {
    playerSpace.className = `up step-${step}`
  }
  if (playerDirection.x === 1 && playerDirection.y === 0) {
    playerSpace.className = `right step-${step}`
  }
  if  (playerDirection.x === 0 && playerDirection.y === 1) {
    playerSpace.className = `down step-${step}`
  }
}


export { drawPlayer, 
    tileBlocked, 
    updatePlayer, 
    setPlayerLocation,
    checkBlocked,
    checkMonster,
    playerLocation, 
    PLAYER_MOVEMENT_SPEED }