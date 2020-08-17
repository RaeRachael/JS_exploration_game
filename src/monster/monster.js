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

export { getMonsters, addMonster, clearMonsterList}