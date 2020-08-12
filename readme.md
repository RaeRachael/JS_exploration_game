# Making a Game, Project in Progress

### [Link to the Ruby, terminal version](https://github.com/RaeRachael/exploration_game)

The ruby version of this game currently has more features, but is only able to be played in the terminal ans suffers from limited graphics associated with that display. But as this is an extenstion of the same project details found in the readme there will be applicable here. 

### How the Game Works

Move yourself with WASD keys, currently there is only one level and no indication of which tile the user should aim to get to, will be coming after the display of the game is improved and tested more fully.

### To Play

#### Website
[Deployed via Surge](http://eploration_game.surge.sh/)

#### Locally
```shell
npm install
http-server
```
then visit ```localhost:8080``` in a browser


### Example Screenshot of the Game

To come once the graphics are more complete

## Comments About the Code Plan, Struggles and Aims

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
