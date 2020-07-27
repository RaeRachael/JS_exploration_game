
var tileMap = []

function turnIntoTiles(levelData) {
    for (var y = 0; y < levelData.length; y ++) {
        for ( var x = 0; x <levelData[0].length; x ++) {
            switch(levelData[y][x]) {
                case "-":
                    tileMap.push({
                        xPos: x,
                        yPos: y,
                        blocksPlayer: true,
                        display: "black"
                    })
                    break;
                case " ":
                    tileMap.push({
                        xPos: x,
                        yPos: y,
                        blocksPlayer: false,
                        display: "white"
                    })
                    break;
                case "S":
                    tileMap.push({
                        xPos: x,
                        yPos: y,
                        blocksPlayer: false,
                        display: "yellow"
                    })
                    break;
                default:
                    // code block
            }
        }
    }
    console.log(tileMap)
}