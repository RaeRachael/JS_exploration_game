import { clearMonsterList, addMonster, getMonsters } from './monster.js';

describe("mosters are saved in an array", function() {
  it("getMosters returns the array", function() {
    expect(Array.isArray(getMonsters())).toEqual(true)
  })
})