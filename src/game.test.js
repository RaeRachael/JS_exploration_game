/**
 * @jest-environment jsdom
 */

import { update, draw, stepAnimation } from './game.js'
import { drawLevel, drawGridOffset } from './level/level.js'
import { drawPlayer, updatePlayer, checkBlocked } from './player/player.js'
import { resetInput, getPlayerDirection, isKeyPressed } from './input/input.js'

jest.mock('./level/level.js', () => ({ 
  drawLevel: jest.fn(),
  drawGridOffset: jest.fn() }) )
jest.mock('./player/player.js', () => ({ 
  drawPlayer: jest.fn(), 
  updatePlayer: jest.fn(),
  checkBlocked: jest.fn()
}) )
jest.mock('./input/input.js', () => ({ 
  resetInput: jest.fn(),
  getPlayerDirection: jest.fn(),
  isKeyPressed: jest.fn()
}) )

afterEach(() => {
  jest.clearAllMocks();
});

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

describe( "function stepAnimation(step)", function() {
  it( "calls drawPlayer and drawGridOffset, on step 0", function() {
    stepAnimation(0)
    expect(drawPlayer.mock.calls.length).toBe(1)
    expect(drawGridOffset.mock.calls.length).toBe(1)
  })

  it( "calls drawPlayer and drawGridOffset, if unblocked", function() {
    checkBlocked.mockReturnValueOnce(false)
    stepAnimation(1)
    expect(drawPlayer.mock.calls.length).toBe(1)
    expect(drawGridOffset.mock.calls.length).toBe(1)
  })

  it( "calls drawPlayer and not drawGridOffset, if blocked", function() {
    checkBlocked.mockReturnValueOnce(true)
    stepAnimation(1)
    expect(drawPlayer.mock.calls.length).toBe(1)
    expect(drawGridOffset.mock.calls.length).toBe(0)
  })

})

