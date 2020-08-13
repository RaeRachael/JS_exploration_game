/**
 * @jest-environment jsdom
 */

import { drawLevel, drawGridOffset, setLevelNumber, getLevelNumber } from './level';
import { setUpLevel } from "../mainLoop.js"

jest.mock( "../mainLoop.js", () => ({ setUpLevel: jest.fn() }) )

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
      var step = 2
      drawGridOffset(direction, step)

      expect(gameBoxOffset.classList[0]).toEqual( "right-2")
    })

  })
})

describe("function setLevelNumber(newNumber)", function() {

  it("calls setUpLevel()", function() {
    setLevelNumber(1)
    expect(setUpLevel.mock.calls.length).toEqual(1)
  })

  it("sets changes current level toargument", function() {
    setLevelNumber(10)
    expect(getLevelNumber()).toEqual(10)
  })

})