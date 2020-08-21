import { clearMonsterList, addMonster, getMonsters, drawMonsters, isMonsterThere, moveMonsters } from './monster.js'
import { findTile } from '../level/level.js'

jest.mock('../level/level.js', () => ({ findTile: jest.fn() }) )

beforeEach(() => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.99)
});

afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore()
})

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

describe("isMonsterThere", function() {

  it("returns true if location matches a monsters one", function() {
    clearMonsterList()
    var location = { x: 1, y: 1 }
    addMonster(location)
    expect(isMonsterThere(location)).toEqual(true)
  })

  it("returns false if location does not match a monsters one", function() {
    clearMonsterList()
    var location = { x: 1, y: 1 }
    var diffLocation = { x: 1, y: 2 }
    addMonster(location)
    expect(isMonsterThere(diffLocation)).toEqual(false)
  })
  
})

describe("moveMonsters", function() {

  it( "doesn't move onto a blocking tile", function() {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.99) // { x: 0, y: -1 }
    findTile.mockReturnValue({
      xPos: 1,
      yPos: 1,
      blocksPlayer: true,
      display: "black"
    })
    clearMonsterList()
    var location = { x: 1, y: 2 }
    addMonster(location)
    moveMonsters()
    expect(getMonsters()[0].location).toEqual(location)
  })

  it( "moves onto a non-blocking tile", function() {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.99) // { x: 0, y: -1 }
    findTile.mockReturnValue({
      xPos: 1,
      yPos: 1,
      blocksPlayer: false,
      display: "white"
    })
    clearMonsterList()
    var location = { x: 1, y: 2 }
    addMonster(location)
    moveMonsters()
    expect(getMonsters()[0].location).toEqual({ x: 1, y: 1 })
  })
  
})