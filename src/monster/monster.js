var monsterList = []

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
      const monsterDisplay = document.createElement('div')
      monsterDisplay.style.gridRowStart = monster.location.y - playerLocation.y + 4
      monsterDisplay.style.gridColumnStart = monster.location.x - playerLocation.x + 4
      monsterDisplay.style.backgroundColor = "red"
      monsterDisplay.innerHTML = "mntr"
      gameBox.appendChild(monsterDisplay)
    }
  });
}

function moveMonsters(tileMap) {
  monsterList.forEach(monster => { move(monster, tileMap) } )
}

function move(monster, tileMap) {
  var direction = randomDirection()
  var possibleLocation = { x: monster.location.x + direction.x, y: monster.location.y + direction.y }
  if (isblockingToMonster(possibleLocation, tileMap) === false && isMonsterThere(possibleLocation) === false) {
    monster.location = possibleLocation 
  }
}

function isblockingToMonster(location, tileMap) {
  var boolean
  tileMap.forEach(function(tile) {
    if (tile.xPos === location.x && tile.yPos === location.y) {
      boolean = tile.blocksPlayer
    }
  });
  return boolean
}

function randomDirection() {
  var moves = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }]
  return moves[Math.floor(Math.random() * 6)]
}

function isMonsterThere(location) {
  var boolean = false
  monsterList.forEach(monster => { 
    if ( monster.location.x === location.x && monster.location.y === location.y ) {
      boolean = true
    }
  })
  return boolean
}

export { getMonsters, addMonster, clearMonsterList, drawMonsters, isMonsterThere, moveMonsters }