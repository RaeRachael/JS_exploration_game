import { turnIntoTiles } from '../tiles/tile.js';

const level = ["-----------",
"- -       -",
"- - ----- -",
"- - -     -",
"- - - -----",
"-   -    S-",
"-----------"]

turnIntoTiles(level)

function drawLevel(gameBox, tileMap, playerLocation) {
    tileMap.forEach(tile => {
        const offsetTileY = tile.yPos - playerLocation.y
        const offsetTileX = tile.xPos - playerLocation.x
        if (offsetTileY > -3 && offsetTileY < 3 && offsetTileX > -3 && offsetTileX < 3) {
            const tileDisplay = document.createElement('div')
            tileDisplay.style.gridRowStart = tile.yPos - playerLocation.y + 3
            tileDisplay.style.gridColumnStart = tile.xPos - playerLocation.x + 3
            tileDisplay.style.backgroundColor = tile.display
            gameBox.appendChild(tileDisplay)
        }
    });
}

export { drawLevel }