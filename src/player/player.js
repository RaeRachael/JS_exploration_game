import { getLevelNumber, setLevelNumber, findTile } from "../level/level.js"
import { isMonsterThere, clearMonsterList } from "../monster/monster.js"
import { openLockedDoor, removeKey} from "../tiles/tile.js"

const PLAYER_MOVEMENT_SPEED = 8
let playerLocation = { x: 1, y: 1 }
let numberOfKeys = 0

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

function movePlayer(playerDirection, pressed) {
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
  let tile = findTile(location)
  let levelNumber = getLevelNumber()
  if( tile.levelChange ) {
    clearMonsterList()
    levelNumber += tile.levelChange
    setLevelNumber(levelNumber)
  }
}

function checkForKey(location) {
  let tile = findTile(location)
  if( tile.text === "key" ) {
    numberOfKeys++
    removeKey(tile)
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
  checkForLockedDoor(location)
  return findTile(location).blocksPlayer
}

function checkForLockedDoor(location) {
  let tile = findTile(location)
  if( tile.text === "locked" && numberOfKeys > 0 ) { 
    numberOfKeys--
    openLockedDoor(tile)
  }
}

export { drawPlayer, 
  isTileBlocking, 
  movePlayer, 
  setPlayerLocation,
  checkBlocked,
  checkMonster,
  playerLocation, 
  PLAYER_MOVEMENT_SPEED,
  numberOfKeys }