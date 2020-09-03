/**
 * @jest-environment jsdom
 */

import { update, draw, checkAndDrawPlayer, updateMonsters } from './game.js'
import { drawLevel, drawGridOffset, isTileTreasure } from './level/level.js'
import { drawPlayer, updatePlayer, checkBlocked, checkMonster } from './player/player.js'
import { resetInput, getPlayerDirection, isKeyPressed } from './input/input.js'
import { drawMonsters, moveMonsters, isMonsterThere } from './monster/monster.js'
import { displayMonsterEnd, displayTreasureEnd } from './main.js'

jest.mock('./level/level.js', () => ({ 
  drawLevel: jest.fn(),
  drawGridOffset: jest.fn(),
  isTileTreasure: jest.fn()
 }) )
jest.mock('./monster/monster.js', () => ({ 
  drawMonsters: jest.fn(),
  moveMonsters: jest.fn(),
  isMonsterThere: jest.fn()
}) )
jest.mock('./main.js', () => ({ 
  displayMonsterEnd: jest.fn(),
  displayTreasureEnd: jest.fn()
 }) )
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

  it( "calls drawMonsters and drawLevel", function() {
    draw(gameBox)
    expect(drawLevel.mock.calls.length).toBe(1)
    expect(drawMonsters.mock.calls.length).toBe(1)
  })

})

describe( "function update()", function() {

  it( "calls updatePlayer and resetInput", function() {
    update()
    expect(updatePlayer.mock.calls.length).toBe(1)
    expect(resetInput.mock.calls.length).toBe(1)
  })

})

describe( "function checkAndDrawPlayer(step)", function() {
  it( "calls drawPlayer, isMonsterThere and drawGridOffset, on step 0", function() {
    checkAndDrawPlayer(0)
    expect(isMonsterThere.mock.calls.length).toBe(1)
    expect(drawPlayer.mock.calls.length).toBe(1)
    expect(drawGridOffset.mock.calls.length).toBe(1)
  })

  it( "calls drawPlayer, isMonsterThere and drawGridOffset, if unblocked", function() {
    checkBlocked.mockReturnValueOnce(false)
    checkAndDrawPlayer(1)
    expect(isMonsterThere.mock.calls.length).toBe(1)
    expect(drawPlayer.mock.calls.length).toBe(1)
    expect(drawGridOffset.mock.calls.length).toBe(1)
  })

  it( "calls isTileTreasure and isMonsterThere and not drawGridOffset or draw Player, if blocked", function() {
    checkBlocked.mockReturnValueOnce(true)
    checkAndDrawPlayer(1)
    expect(isMonsterThere.mock.calls.length).toBe(1)
    expect(isTileTreasure.mock.calls.length).toBe(1)
    expect(drawPlayer.mock.calls.length).toBe(0)
    expect(drawGridOffset.mock.calls.length).toBe(0)
  })

  it( "calls displayMonsterEnd, if isMonsterThere is true", function() {
    isMonsterThere.mockReturnValueOnce(true)
    checkAndDrawPlayer(1)
    expect(displayMonsterEnd.mock.calls.length).toBe(1)
    expect(drawPlayer.mock.calls.length).toBe(0)
    expect(drawGridOffset.mock.calls.length).toBe(0)
  })

  it( "calls displayTreasureEnd, if isTileTreasure is true", function() {
    isTileTreasure.mockReturnValueOnce(true)
    checkAndDrawPlayer(1)
    expect(displayTreasureEnd.mock.calls.length).toBe(1)
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


