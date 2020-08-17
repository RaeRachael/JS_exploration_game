import { clearMonsterList, addMonster, getMonsters } from './monster.js';

describe("mosters are saved in an array", function() {
  it("getMosters returns the array", function() {
    expect(Array.isArray(getMonsters())).toEqual(true)
  })

  describe("addMonster adds a monster to the monsterList", function() {
    it("takes in position parameters", function() {
      var location = { x: 1, y: 1 }
      addMonster(location)
      expect(getMonsters().length).toEqual(1)
    })
  })

  describe("clearMonsterList removes all monsters from the monsterList", function() {
    it("removes monsers from the list", function() {
      var location = { x: 1, y: 1 }
      addMonster(location)
      clearMonsterList()
      expect(getMonsters().length).toEqual(0)
    })
  })

})