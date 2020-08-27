import { getLevelNumber, setLevelNumber, findTile, removeKey } from "../level/level.js"
import { isMonsterThere, clearMonsterList } from "../monster/monster.js"

const PLAYER_MOVEMENT_SPEED = 5
var playerLocation = { x: 1, y: 1 }
var numberOfKeys = 0

function setPlayerLocation(location) {
    playerLocation = location
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

function updatePlayer(playerDirection, pressed) {
  if (pressed === true) {
    const possibleNewlocation = getPossibleLocation(playerDirection)
    if ( isTileBlocking(possibleNewlocation) === false ) {
      playerLocation.x = possibleNewlocation.x
      playerLocation.y = possibleNewlocation.y
      checkForStairs(playerLocation)
      checkForKey(playerLocation)
    }
  }
}

function checkForStairs(location) {
  var tile = findTile(location)
  var levelNumber = getLevelNumber()
  if( tile.levelChange ) {
    clearMonsterList()
    levelNumber += tile.levelChange
    setLevelNumber(levelNumber)
  }
}

function checkForKey(location) {
  var tile = findTile(location)
  if( tile.text === "key" ) {
    numberOfKeys++
    removeKey(location)
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
  openLockedDoor(location)
  return findTile(location).blocksPlayer
}

function openLockedDoor(location) {
  var tile = findTile(location)
  if( tile.text === "locked" && numberOfKeys > 0 ) { 
    tile.blocksPlayer = false
    tile.text = "open"
    numberOfKeys--
  }
}

export { drawPlayer, 
  isTileBlocking, 
  updatePlayer, 
  setPlayerLocation,
  checkBlocked,
  checkMonster,
  playerLocation, 
  PLAYER_MOVEMENT_SPEED,
  numberOfKeys }