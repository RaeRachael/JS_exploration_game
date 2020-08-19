/**
 * @jest-environment jsdom
 */

import { update, draw, stepAnimation, updateMonsters } from './game.js'
import { drawLevel, drawGridOffset } from './level/level.js'
import { drawPlayer, updatePlayer, checkBlocked, checkMonster } from './player/player.js'
import { resetInput, getPlayerDirection, isKeyPressed } from './input/input.js'
import { drawMonsters, moveMonsters } from './monster/monster.js'
import { displayMonsterEnd } from './mainLoop.js'

jest.mock('./level/level.js', () => ({ 
  drawLevel: jest.fn(),
  drawGridOffset: jest.fn() }) )
jest.mock('./monster/monster.js', () => ({ 
  drawMonsters: jest.fn(),
  moveMonsters: jest.fn()
}) )
jest.mock('./mainLoop.js', () => ({ displayMonsterEnd: jest.fn() }) )
jest.mock('./player/player.js', () => ({ 
  drawPlayer: jest.fn(), 
  updatePlayer: jest.fn(),
  checkBlocked: jest.fn(),
  checkMonster: jest.fn()
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

  it( "calls drawPlayer, drawMonsters and drawLevel", function() {
    draw(gameBox)
    expect(drawLevel.mock.calls.length).toBe(1)
    expect(drawMonsters.mock.calls.length).toBe(1)
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
  it( "calls drawPlayer, checkMoster and drawGridOffset, on step 0", function() {
    stepAnimation(0)
    expect(checkMonster.mock.calls.length).toBe(1)
    expect(drawPlayer.mock.calls.length).toBe(1)
    expect(drawGridOffset.mock.calls.length).toBe(1)
  })

  it( "calls drawPlayer, checkMoster and drawGridOffset, if unblocked", function() {
    checkBlocked.mockReturnValueOnce(false)
    stepAnimation(1)
    expect(checkMonster.mock.calls.length).toBe(1)
    expect(drawPlayer.mock.calls.length).toBe(1)
    expect(drawGridOffset.mock.calls.length).toBe(1)
  })

  it( "calls drawPlayer, checkMoster and not drawGridOffset, if blocked", function() {
    checkBlocked.mockReturnValueOnce(true)
    stepAnimation(1)
    expect(checkMonster.mock.calls.length).toBe(1)
    expect(drawPlayer.mock.calls.length).toBe(1)
    expect(drawGridOffset.mock.calls.length).toBe(0)
  })

  it( "calls displayMonsterEnd, if checkMonster is true", function() {
    checkMonster.mockReturnValueOnce(true)
    stepAnimation(1)
    expect(displayMonsterEnd.mock.calls.length).toBe(1)
    expect(drawPlayer.mock.calls.length).toBe(0)
    expect(drawGridOffset.mock.calls.length).toBe(0)
  })

})

describe( "function updateMonsters", function() {

  it( "calls moveMonsters and draw", function() {
    updateMonsters()
    expect(moveMonsters.mock.calls.length).toBe(1)
  })

})


