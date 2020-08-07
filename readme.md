# Making a Game, Project in Progress

### [Link to the Ruby, terminal version](https://github.com/RaeRachael/exploration_game)

The ruby version of this game currently has more features, but is only able to be played in the terminal ans suffers from limited graphics associated with that display. But as this is an extenstion of the same project details found in the readme there will be applicable here. 

### How the Game Works

Move yourself with WASD keys, currently there is only one level and no indication of which tile the user should aim to get to, will be coming after the display of the game is improved and tested more fully.

### To Play

```shell
npm install
http-server
```
then visit ```localhost:8080``` in a browser


### Example Screenshot of the Game

To come once the graphics are more complete

## Comments About the Code Plan, Struggles and Aims

### Friday 7th August

#### Coding Aims Completed
* Game responds to user inputs
* Player sprite faces direction based on user input
* Game displays the local area arounf the player
* Walls correctly block Player movement

### Sunday 14th June

#### Coding Aims Completed
* fixed personal rubocop
* Impoved code base via rubocop suggestions

#### Challenges
There was a little bit of a challenge in getting the player spite to load without a flicker, as originally the display function for the player sprite was making a get request to the sprite sheet image. To fix this issue I added the whole sprite image to the player div element, and then specify the location to take the sub image from after by changing the id value of the element. So all of the details related to the spritesheet is held in the CSS which is only called once when the page is loaded. 

#### Future Aims
* Update the graphics of the Tiles, using a similiar approach to the player sprite.
* Include the walking sprites of the player and add inbetween tile displays to make the movement look smoother
* Improve the test coverage of the code, currently around 80% because there isn't any testing on the display output beyond manually starting up the game. 
* Add in interaction of stepping on the stair up tile to load in level 2
