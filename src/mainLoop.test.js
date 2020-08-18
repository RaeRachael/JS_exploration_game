import { update, draw, stepAnimation } from './game.js'
import { PLAYER_MOVEMENT_SPEED } from './player/player.js'
import { mainLoop, setUpLevel, displayMonsterEnd } from './mainLoop.js'
import { keyPress, isKeyPressed } from './input/input.js'

jest.mock('./game.js', () => ({ 
  update: jest.fn(), 
  draw: jest.fn(),
  stepAnimation: jest.fn()
}) )
jest.mock('./input/input.js', () => ({ 
  keyPress: jest.fn(),
  isKeyPressed: jest.fn()
 }) )

afterEach(() => {
  jest.clearAllMocks();
});

describe( "function mainLoop()", function() {

  it( "calls only keyPress for first pass", function() {
    mainLoop(0)
    expect(keyPress.mock.calls.length).toBe(1)
    expect(update.mock.calls.length).toBe(0)
    expect(draw.mock.calls.length).toBe(0)
    expect(stepAnimation.mock.calls.length).toBe(0)
  })

  it( "calls stepAnimation enough time has passed", function() {
    mainLoop(0)
    mainLoop(1001 /(PLAYER_MOVEMENT_SPEED * 3))
    expect(keyPress.mock.calls.length).toBe(2)
    expect(stepAnimation.mock.calls.length).toBe(1)
  })

  it( "calls update and draw after for every 3 stepAnimation calls if key is pressed", function() {
    isKeyPressed.mockReturnValue(true)
    mainLoop(10000)
    mainLoop(1001 /(PLAYER_MOVEMENT_SPEED * 3) + 10000)
    mainLoop(2* 1001 /(PLAYER_MOVEMENT_SPEED * 3) + 10000)
    mainLoop(3* 1001 /(PLAYER_MOVEMENT_SPEED * 3) + 10000)
    expect(keyPress.mock.calls.length).toBe(4)
    expect(stepAnimation.mock.calls.length).toBe(4)
    expect(update.mock.calls.length).toBe(1)
    expect(draw.mock.calls.length).toBe(1)
  })

  it ( "returns 'the game is over if play is false, no function are called", function() {
    displayMonsterEnd()
    expect(mainLoop(0)).toEqual("the game is over")
    expect(keyPress.mock.calls.length).toBe(0)
    expect(stepAnimation.mock.calls.length).toBe(0)
    expect(update.mock.calls.length).toBe(0)
    expect(draw.mock.calls.length).toBe(0)
  })

})

describe( "function setUpLevel(levelNumber)", function() {

  it( "calls draw", function() {
    setUpLevel(0)
    expect(draw.mock.calls.length).toBe(1)
  })

})

describe( "function displayMonsterEnd", function() {

  it( "replaces the body of the page", function() {
    displayMonsterEnd()
    expect(document.body.innerHTML).toEqual("EATEN BY A MONSTER")
  })

})