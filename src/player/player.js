import { getLevelNumber, setLevelNumber, findTile } from "../level/level.js"
import { isMonsterThere } from "../monster/monster.js"

const PLAYER_MOVEMENT_SPEED = 5
var playerLocation = { x: 1, y: 1 }

function setPlayerLocation(location) {
    playerLocation = location
}

function updatePlayer(playerDirection, pressed) {
  if (pressed === true) {
    const possibleNewlocation = getPossibleLocation(playerDirection)
    if ( isTileBlocking(possibleNewlocation) === false ) {
      playerLocation.x = possibleNewlocation.x
      playerLocation.y = possibleNewlocation.y
      checkForStairs(findTile(playerLocation))
    }
  }
}

function checkForStairs(tile) {
  var levelNumber = getLevelNumber()
  if( tile.levelChange ) {
    levelNumber += tile.levelChange
    setLevelNumber(levelNumber)
  }
}

function checkBlocked(playerDirection){
  return isTileBlocking(getPossibleLocation(playerDirection))
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

function isTileBlocking(location) {
 return findTile(location).blocksPlayer
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
    isTileBlocking, 
    updatePlayer, 
    setPlayerLocation,
    checkBlocked,
    checkMonster,
    playerLocation, 
    PLAYER_MOVEMENT_SPEED }