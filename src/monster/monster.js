var monsterList = []

function getMonsters() {
  return monsterList
}

function addMonster(location) {
  console.log("monster addded", location)
  monsterList.push({location: location})
}

function clearMonsterList() {
  monsterList = []
}

function drawMonsters(gameBox, playerLocation) {
  console.log("monsters appear", monsterList)
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

export { getMonsters, addMonster, clearMonsterList, drawMonsters }