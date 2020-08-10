/**
 * @jest-environment jsdom
 */

import { drawLevel } from './level';

describe( "function drawLevel()", function() {

  document.body.innerHTML = '<div id="game-box" />';
  let gameBox = document.getElementById("game-box")

  var tileMap = [{ blocksPlayer: true, display: "black", xPos: 0, yPos: 0 }, 
  { blocksPlayer: false, display: "white", xPos: 1, yPos: 0 }]
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

  })
  
})