import { clearMonsterList, addMonster, getMonsters, drawMonsters } from './monster.js';

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
    it("removes monsters from the list", function() {
      var location = { x: 1, y: 1 }
      addMonster(location)
      clearMonsterList()
      expect(getMonsters().length).toEqual(0)
    })
  })

})

describe( "function drawMonsters()", function() {

  document.body.innerHTML = '<div id="game-box" />';
  let gameBox = document.getElementById("game-box")

  var playerLocation = { x: 1, y: 1}

  it( "adds a child with correct style, based on playerLocation", function() {
    addMonster({ x: 2, y: 2 })
    addMonster({ x: 2, y: 3 })
    addMonster({ x: 54, y: 42 })

    drawMonsters(gameBox, playerLocation)

    expect(gameBox.children[0].style._values).toEqual(
      expect.objectContaining({
        'grid-row-start': 5,
        'grid-column-start': 5,
        'background-color': 'red'
      })
    )

    expect(gameBox.children[1].style._values).toEqual(
      expect.objectContaining({
        'grid-row-start': 6,
        'grid-column-start': 5,
        'background-color': 'red'
      })
    )

    expect(gameBox.children.length).toEqual(2)

  })
  
})