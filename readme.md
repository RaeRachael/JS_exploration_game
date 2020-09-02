# Making a Game, Project in Progress

### [Link to the Ruby, terminal version](https://github.com/RaeRachael/exploration_game)

The ruby version of this game currently has more features, but is only able to be played in the terminal ans suffers from limited graphics associated with that display. But as this is an extenstion of the same project details found in the readme there will be applicable here. 

### How the Game Works

Move yourself with WASD keys, currently there is only one level and no indication of which tile the user should aim to get to, will be coming after the display of the game is improved and tested more fully.

### To Play

#### Website
[Deployed via Surge](http://exploration-game.surge.sh/)

#### Locally
```shell
npm install
http-server
```
then visit ```localhost:8080``` in a browser


### Example Screenshot of the Game

To come once the graphics are more complete

## Comments About the Code Plan, Struggles and Aims

### Wednesday 2nd September

#### Coding Aims Completed
* Added in tile and door to master
* Created correct interaction between the number of keys and doors being opened
* Key pickups and unlocking of doors are retained when moving between levels
* Added in Treasure tile, and the treasure ending display.
* Added in touch screeen compatability

### Past code improvements 
* Fixed the check of being on the same tile as a monster
* Fixed the problem of the first stairs up, used to reload the first level not the second one
* Changed variables related to player movement speed and how often monsters to make the game easier

#### Challenges
Maintaining a history of other levels after changing a level meant that all levels are now turned into tiles at the start of the game, (possible if multiple stages are used in the future the load can be of individual stages). This meant that all the monsters were being loaded at the start, so monster loading in had to be seperately done on each level change. This wasn't too difficult to code, but did mean that a few tests had to have slight changes to inputs and the code needs to be tidied up a little bit.

Adding in touch screen interactions wasn't too bad, there is simply a check on the location of a touch and if it is in a region corresponding to a direction, the useKeyPress code is used the right key being used as the input.

#### Future Aims
* Look into the best way to test an event listener, and also simulate a touch event on a screen
* Add in a start screen with variable difficulty.
* Create a second stage (?)

### Wednesday 26th August

#### Coding Aims Completed
* Added in Monster on level 2
* Added in the lost condition if the player is on the same tile as a Monster
* (Not yet merged into master) Added tiles for doors and keys
* (Not yet merged into master) Keys are removed from the level after being picked up (currently reappear if level reloads)
* (Not yet merged into master) Monster list is cleared out after a level change

#### Challenges
Finding the easiest way to turn a key into a floor tile, as for this branch my aim is to be very focused on following TDD (unit tests instead for BDD by starting with feature tests) not sure if this coding style will continue after this branch but experimenting on TDD when creating the objective as well. 

#### Future Aims
* Making it so Door unlock when attempting to be moved through, if the player has a key (using up the key)
* Make it so the the level has a rememory of the keys that have been picked up
* Look into the best way to test an event listener (the only part of the code base that is not being tested yet)

### Monday 17th August

#### Coding Aims Completed
* Added in level changes due to stepping on stairs
* Code coverage is now 99%, the test for display are based on giving the correct class assignment not the style (which is generated in the style.css file)
* Code is now deployed via Surge
* Travis is in use, but needs to be manual checked before pushing code up to deployment

#### Challenges
Getting the level to propperly reload after stepping on a tile was interesting, with code sometimes adding the new level data to the ennd of the current level data or the game box not using the new level data for display.

#### Future Aims
* Update the graphics of the Tiles, using a similiar approach to the player sprite.
* Add in the monster that should be present on level 2
* Look into the best way to test an event listener (the only part of the code base that is not being tested yet)

### Tuesday 11th August

#### Coding Aims Completed
* Added Smooth transition between Tiles of the player sprite, and included animation for the sprite walking
* Code test coverage is about 90% with much more reasonable test of the individual units. the test for display are based on giving the correct class assignment not the style (which is generated in the style.css file)

#### Challenges
Getting the timing for each part of the step was challenging when I was trying to do it outside of the mainLoop file, as that is where all the timing related code was running. Since adding it into there it wasn't too challenging. and now the base timing of the game is related to the time the player to move 1/3 of a tile (the time between each of the animation steps). This was done so that each step was fully animated and wasn't dependant on what part of the 'render' steps the key was pressed in.

#### Short Term Goals
* Deploy on heroku or similiar, adding in Travis as CI
* Start using branches for features now that the core of a game is in place

#### Future Aims
* Update the graphics of the Tiles, using a similiar approach to the player sprite.
* Add in interaction of stepping on the stair up tile to load in level 2
* Improve the test coverage of the mainLoop, will need to find out the best way to deal with timing in Jest. 

### Friday 7th August

#### Challenges
There was a little bit of a challenge in getting the player spite to load without a flicker, as originally the display function for the player sprite was making a get request to the sprite sheet image. To fix this issue I added the whole sprite image to the player div element, and then specify the location to take the sub image from after by changing the id value of the element. So all of the details related to the spritesheet is held in the CSS which is only called once when the page is loaded. 

#### Future Aims
* Update the graphics of the Tiles, using a similiar approach to the player sprite.
* Include the walking sprites of the player and add inbetween tile displays to make the movement look smoother
* Improve the test coverage of the code, currently around 80% because there isn't any testing on the display output beyond manually starting up the game. 
* Add in interaction of stepping on the stair up tile to load in level 2
