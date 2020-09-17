/**
 * @jest-environment jsdom
 */

import { drawLevel, drawGridOffset, setLevelNumber, getLevelNumber, findTile, includeMonsters, loadLevelsAsTiles, isTileTreasure } from './level';
import { getTileMap, selectTileMap, turnIntoTiles } from "../tiles/tile.js"
import { addMonster } from '../monster/monster';

jest.mock( "../monster/monster.js", () => ({ addMonster: jest.fn() }) )
jest.mock( "../tiles/tile.js", () => ({ 
  getTileMap: jest.fn(),
  selectTileMap: jest.fn(),
  turnIntoTiles: jest.fn()
 }) )

describe( "function drawLevel()", function() {

  document.body.innerHTML = '<div id="game-box" />';
  let gameBox = document.getElementById("game-box")

  var tileMap = [{ blocksPlayer: true, display: "black", xPos: 0, yPos: 0 }, 
  { blocksPlayer: false, display: "white", xPos: 1, yPos: 0 }, 
  { blocksPlayer: true, display: "black", xPos: 50, yPos: 0 }]
  var playerLocation = { x: 1, y: 1}

  it( "adds a child with correct style, based on playerLocation", function() {

    drawLevel(gameBox, tileMap, playerLocation)

    expect(gameBox.children[0].style._values).toEqual(
      expect.objectContaining({
        'grid-row-start': 3,
        'grid-column-start': 3,
        'background-color': 'black'
      })
    )

    expect(gameBox.children[1].style._values).toEqual(
      expect.objectContaining({
        'grid-row-start': 3,
        'grid-column-start': 4,
        'background-color': 'white'
      })
    )

    expect(gameBox.children.length).toEqual(2)

  })
  
})

describe( "function drawGridOffset()", function() {
  document.body.innerHTML = '<div id="gamebox-offset" />';
  let gameBoxOffset = document.getElementById("gamebox-offset")


  describe( "adds the correct class based on step and direction", function() {

    it( "class is 'up-1'", function() {
      var direction = { x: 0, y: -1 }
      var step = 1
      drawGridOffset(direction, step)

      expect(gameBoxOffset.classList[0]).toEqual( "up-1")
    })
    it( "class is 'down-2'", function() {
      var direction = { x: 0, y: 1 }
      var step = 2
      drawGridOffset(direction, step)

      expect(gameBoxOffset.classList[0]).toEqual( "down-2")
    })
    it( "class is 'left-1'", function() {
      var direction = { x: -1, y: 0 }
      var step = 1
      drawGridOffset(direction, step)

      expect(gameBoxOffset.classList[0]).toEqual( "left-1")
    })
    it( "class is 'right-2'", function() {
      var direction = { x: 1, y: 0 }
      var step = 0
      drawGridOffset(direction, step)

      expect(gameBoxOffset.classList[0]).toEqual( "right-0")
    })

    it( "class is 'blocked', if direction = 'blocked'", function() {
      var direction = "blocked"
      var step = 2
      drawGridOffset(direction, step)

      expect(gameBoxOffset.classList[0]).toEqual( "blocked")
    })

  })
})

describe("function setLevelNumber(newNumber)", function() {

  it("calls selectTileMap()", function() {
    setLevelNumber(1)
    expect(selectTileMap.mock.calls.length).toEqual(1)
  })

  it("sets changes current level to argument", function() {
    setLevelNumber(5)
    expect(getLevelNumber()).toEqual(5)
  })

})

describe("function findTile(location)", function() {

  it("returns the tile at te location specified", function() {
    var tileMap = [{ blocksPlayer: true, display: "black", xPos: 0, yPos: 0 }, 
    { blocksPlayer: false, display: "white", xPos: 1, yPos: 0 }, 
    { blocksPlayer: true, display: "black", xPos: 50, yPos: 0 }]

    getTileMap.mockReturnValue(tileMap)

    expect(findTile({x: 0, y: 0})).toEqual( { blocksPlayer: true, display: "black", xPos: 0, yPos: 0 } )
    expect(findTile({x: 1, y: 0})).toEqual( { blocksPlayer: false, display: "white", xPos: 1, yPos: 0 } )
  })

})

describe("function includeMonster()", function() {

  it("calls add moster with the moster location on the current level", function() {
    addMonster.mock.calls = []
    setLevelNumber(2)
    expect(addMonster.mock.calls[0]).toEqual([{x: 4, y: 2}])
  })

})

describe("function loadLevelAsTiles", function() {
  
  it("calls turnIntoTiles for the level data", function() {
    loadLevelsAsTiles()
    expect(turnIntoTiles.mock.calls.length).toEqual(1)
  })

})

describe("function isTileTreasure", function() {

  it("returns true if the tile is treasure", function() {
    var tileMap = [{ blocksPlayer: true, display: "black", xPos: 0, yPos: 0, text: "gold" }, 
    { blocksPlayer: false, display: "white", xPos: 1, yPos: 0, text: "key" }, 
    { blocksPlayer: true, display: "black", xPos: 50, yPos: 0 }]

    getTileMap.mockReturnValue(tileMap)
    expect(isTileTreasure({x: 0, y: 0})).toEqual(true)
    expect(isTileTreasure({x: 1, y: 0})).toEqual(false)
  })

})