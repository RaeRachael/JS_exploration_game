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

function isMonsterThere(location) {
  var boolean = false
  monsterList.forEach(monster => { 
    if ( monster.location.x === location.x && monster.location.y === location.y ) {
      boolean = true
    }
  })
  return boolean
}

export { getMonsters, addMonster, clearMonsterList, drawMonsters, isMonsterThere }