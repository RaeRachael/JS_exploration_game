/**
 * @jest-environment jsdom
 */

import { update, draw } from './game.js'
import { drawLevel } from './level/level.js'
import { drawPlayer, updatePlayer } from './player/player.js'
import { resetInput, getPlayerDirection } from './input/input.js'

jest.mock('./level/level.js', () => ({ drawLevel: jest.fn() }) )
jest.mock('./player/player.js', () => ({ 
  drawPlayer: jest.fn(), 
  updatePlayer: jest.fn()
}) )
jest.mock('./input/input.js', () => ({ 
  resetInput: jest.fn(),
  getPlayerDirection: jest.fn()
}) )


describe( "function draw()", function() {

  document.body.innerHTML = '<div id="game-box" />';
  var gameBox = document.getElementById("game-box")

  it( "calls drawPlayer and drawLevel", function() {
    draw(gameBox)
    expect(drawLevel.mock.calls.length).toBe(1)
    expect(drawPlayer.mock.calls.length).toBe(1)
  })

})

describe( "function update()", function() {

  it( "calls drawPlayer and drawLevel", function() {
    update()
    expect(updatePlayer.mock.calls.length).toBe(1)
    expect(resetInput.mock.calls.length).toBe(1)
  })

})

