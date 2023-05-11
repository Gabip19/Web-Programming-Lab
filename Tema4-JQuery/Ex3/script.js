const elems = [];
var selectedTiles = [];
var values = [];
var flippedValues = [];

function switchContentVisibility(node) {
    node.children().each(function() {
        $(this).toggle();
    });
}

function flipTile(tile) {
    console.log("Click pe " + tile + " " + tile.attr("tileset"));
    if (selectedTiles.length < 2 && !selectedTiles.includes(tile) && !flippedValues.includes(tile.attr("tileset"))) {
        selectedTiles.push(tile);
        values.push(tile.attr("tileset"));
        switchContentVisibility(tile);
        if (selectedTiles.length == 2) {
            if (tile.attr("tileset") == values[0]) {
                selectedTiles = [];
                values = [];
                flippedValues.push(tile.attr("tileset"));
                if (flippedValues.length * 2 == elems.length) {
                    alert("YOU WON!!! Congrats!!!");
                }
            } else {
                setTimeout(function() {
                    switchContentVisibility(selectedTiles[0]);
                    switchContentVisibility(selectedTiles[1]);
                    selectedTiles = [];
                    values = [];
                }, 500);
            }
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

$(function () {
    let board = $("#board");
    let index = 0;
    board.children("div").each(function() {
        let tileSet = index.valueOf();

        elems.push( $("<div></div>").html($(this).html()).attr("tileset", tileSet) );
        elems.push( $(this).attr("tileset", tileSet) );

        index++;
    });

    board.on("click", "div", function() {
        flipTile($(this));
    });

    shuffleArray(elems);
    board.empty();
    elems.forEach(function(node) {
        switchContentVisibility(node);
        board.append(node);
    });
});