const elems = [];
var selectedTiles = [];
var values = [];
var flipped_values = [];

function switchContentVisibility(node) {
    Array.from(node.children).forEach(child => 
        child.style.visibility == "hidden" ? 
        child.style.visibility = "visible" : 
        child.style.visibility = "hidden"
    );
}

function flipTile(tile, val) {
    console.log("Click pe " + tile + val);
    if (selectedTiles.length < 2 && !selectedTiles.includes(tile) && !flipped_values.includes(val)) {
        selectedTiles.push(tile);
        values.push(val);
        switchContentVisibility(tile);
        if (selectedTiles.length == 2) {
            if (val == values[0]) {
                selectedTiles = [];
                values = [];
                flipped_values.push(val);
                if (flipped_values.length * 2 == elems.length) {
                    alert("YOU WON!!! Congrats!!!");
                }
            } else {
                setTimeout(() => {
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

function populateBoard() {
    let board = document.getElementById("board");
    let nodes = board.querySelectorAll("#board > div");
    let index = 0;
    nodes.forEach(node => {
        let sibling = document.createElement("div");
        sibling.innerHTML = node.innerHTML;

        let tileSet = index.valueOf();
        node.onclick = () => flipTile(node, tileSet);
        sibling.onclick = () => flipTile(sibling, tileSet);
        index++;

        elems.push(node);
        elems.push(sibling);
    })

    shuffleArray(elems);
    board.replaceChildren();
    elems.forEach(node => {
        switchContentVisibility(node);
        board.appendChild(node);
    });
}

window.onload = populateBoard;