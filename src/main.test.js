import { updatePlayer, draw, checkAndDrawPlayer, updateMonsters } from './game.js'
import { PLAYER_MOVEMENT_SPEED } from './player/player.js'
import { mainLoop, startup, displayMonsterEnd, displayTreasureEnd, increaseCount } from './main.js'
import { setupInput, isKeyPressed } from './input/input.js'
import { findTile, loadLevelsAsTiles } from "./level/level.js"
import { selectTileMap } from './tiles/tile.js'

jest.mock('./game.js', () => ({ 
  updatePlayer: jest.fn(), 
  draw: jest.fn(),
  checkAndDrawPlayer: jest.fn(),
  updateMonsters: jest.fn()
}) )
jest.mock('./input/input.js', () => ({ 
  setupInput: jest.fn(),
  isKeyPressed: jest.fn()
 }) )
jest.mock('./level/level.js', () => ({ loadLevelsAsTiles: jest.fn() }) )
jest.mock('./tiles/tile.js', () => ({ selectTileMap: jest.fn() }) )

afterEach(() => {
  jest.clearAllMocks();
});

describe( "function mainLoop()", function() {

  it( "doesn't call function on the first pass", function() {
    mainLoop(0)
    expect(updatePlayer.mock.calls.length).toBe(0)
    expect(draw.mock.calls.length).toBe(0)
    expect(checkAndDrawPlayer.mock.calls.length).toBe(0)
  })

  it( "calls checkAndDrawPlayer enough time has passed", function() {
    mainLoop(0)
    mainLoop(1001 /(PLAYER_MOVEMENT_SPEED * 3))
    expect(checkAndDrawPlayer.mock.calls.length).toBe(1)
  })

  it( "calls update for every 3 checkAndDrawPlayer and Draw calls if key is pressed", function() {
    isKeyPressed.mockReturnValue(true)
    mainLoop(10000)
    mainLoop(1001 /(PLAYER_MOVEMENT_SPEED * 3) + 10000)
    mainLoop(2* 1001 /(PLAYER_MOVEMENT_SPEED * 3) + 10000)
    mainLoop(3* 1001 /(PLAYER_MOVEMENT_SPEED * 3) + 10000)
    expect(checkAndDrawPlayer.mock.calls.length).toBe(4)
    expect(updatePlayer.mock.calls.length).toBe(1)
    expect(draw.mock.calls.length).toBe(4)
  })

  it ( "returns 'the game is over if play is false, no function are called", function() {
    displayMonsterEnd()
    expect(mainLoop(0)).toEqual("the game is over")
    expect(checkAndDrawPlayer.mock.calls.length).toBe(0)
    expect(updatePlayer.mock.calls.length).toBe(0)
    expect(draw.mock.calls.length).toBe(0)
  })

})

describe( "function startup()", function() {

  it( "calls setupInput, loadLevelsAsTiles and selectTileMap", function() {
    startup()
    expect(setupInput.mock.calls.length).toBe(1)
    expect(loadLevelsAsTiles.mock.calls.length).toBe(1)
    expect(selectTileMap.mock.calls[0]).toEqual([1])
  })

})

describe( "function displayMonsterEnd", function() {

  it( "replaces the body of the page", function() {
    displayMonsterEnd()
    expect(document.body.innerHTML).toEqual("EATEN BY A MONSTER")
  })

})

describe( "function displayTreasureEnd", function() {

  it( "replaces the body of the page", function() {
    displayTreasureEnd()
    expect(document.body.innerHTML).toEqual("YOU GOT THE TREASURE")
  })

})

describe( "function increaseCount", function() {

  it( "calls updateMonster every ten calls", function() {
    for (var i = 0; i < 10; i++) {
      increaseCount()
    }
    expect(updateMonsters.mock.calls.length).toBe(1) 
  })

})