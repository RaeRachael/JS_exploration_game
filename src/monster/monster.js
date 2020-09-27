import { findTile } from "../level/level.js"

let monsterList = []

function getMonsters() {
  return monsterList
}

function addMonster(location) {
  monsterList.push({location: location})
}

function clearMonsterList() {
  monsterList = []
}

function drawMonsters(gameBox, playerLocation) {
  monsterList.forEach(monster => {
    const offsetTileY = monster.location.y - playerLocation.y
    const offsetTileX = monster.location.x - playerLocation.x
    if (offsetTileY > -4 && offsetTileY < 4 && offsetTileX > -4 && offsetTileX < 4) {
      displayOneMonster(gameBox, { x: offsetTileX + 4, y: offsetTileY + 4 })
    }
  });
}

function displayOneMonster(gameBox, position) {
  const monsterDisplay = document.createElement('div')
  monsterDisplay.style.gridRowStart = position.y
  monsterDisplay.style.gridColumnStart = position.x
  monsterDisplay.style.backgroundColor = "red"
  monsterDisplay.innerHTML = "mntr"
  gameBox.appendChild(monsterDisplay)
}

function moveMonsters() {
  monsterList.forEach(monster => { move(monster) } )
}

function move(monster) {
  var direction = randomDirection()
  var possibleLocation = { x: monster.location.x + direction.x, y: monster.location.y + direction.y }
  if (isBlockingToMonster(possibleLocation) === false && isMonsterThere(possibleLocation) === false) {
    monster.location = possibleLocation 
  }
}

function isBlockingToMonster(location) {
  return findTile(location).blocksPlayer
}

function randomDirection() {
  const moves = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }]
  return moves[Math.floor(Math.random() * 6)]
}

function isMonsterThere(location) {
  let isMonster = false
  monsterList.forEach(monster => { 
    if ( monster.location.x === location.x && monster.location.y === location.y ) {
      isMonster = true
    }
  })
  return isMonster
}

export { getMonsters, addMonster, clearMonsterList, drawMonsters, isMonsterThere, moveMonsters }