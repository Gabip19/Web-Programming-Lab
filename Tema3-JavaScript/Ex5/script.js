
window.onload = generateTable;
document.onkeydown = checkKey;

var N = 3;
var empty = 0;
var numbers = [];

function generateTable() {
    table = document.getElementById("board");
    table.replaceChildren();
    
    N = document.getElementById("nValue").value;
    console.log("N: " + N);
    if (N < 3) {
        return;
    }

    numbers = generateNumbers(N * N);

    for (let i = 0; i < N; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < N; j++) {
            let column = document.createElement("td");

            elem = numbers[i * N + j];
            if (elem != N * N) {
                column.innerHTML = elem;
                column.id = elem;
            } else {
                empty = i * N + j;
                column.id = N * N;
            }
            console.log(column.id);
            row.appendChild(column);
        }
        table.appendChild(row);
    }

    console.log("Empty: " + empty);
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function generateNumbers(n) {
    array = [];
    for (let i = 1; i <= n; i++) {
        array.push(i);
    }
    shuffle(array);
    while (!isSolvable(array)) {
        shuffle(array);
    }
    return array;
}

function checkKey(e) {
    if (e.keyCode == '38') {
        if (empty - N >= 0) swap(empty, empty - N);
    } else if (e.keyCode == '40') {
        let s = (empty*1 + N*1)*1;
        if (s < N * N) swap(empty, empty*1 + N*1);
    } else if (e.keyCode == '37') {
        if (empty % N != 0) swap(empty, empty - 1);
    } else if (e.keyCode == '39') {
        if (empty % N != N - 1) swap(empty, empty + 1);
    }
    if (hasWon()) {
        alert("Ai castigat!!! Congrats!!!");
    }
}

function swap(pos1, pos2) {
    console.log("Swaping: " + pos1 + " " + pos2);
    
    let first = document.getElementById(numbers[pos1]);
    let second = document.getElementById(numbers[pos2]);
    let auxHtml = first.innerHTML;
    first.innerHTML = second.innerHTML;
    second.innerHTML = auxHtml;

    first.id = numbers[pos2];
    second.id = numbers[pos1];

    let aux = numbers[pos1];
    numbers[pos1] = numbers[pos2];
    numbers[pos2] = aux;

    empty = pos2*1;
    console.log("Empty: " + empty);
}

function hasWon() {
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] != numbers[i + 1] - 1)
            return false;
    }
    return true;
}



// check if is solvable

function getInvCount(arr) {
    let inv_count = 0;
    for (let i = 0; i < N * N - 1; i++) {
        for (let j = i + 1; j < N * N; j++) {
            if (arr[j] && arr[i] && arr[i] > arr[j])
                inv_count++;
        }
    }
    return inv_count;
}

function findXPosition(puzzle) {
    for (let i = N - 1; i >= 0; i--)
        for (let j = N - 1; j >= 0; j--)
            if (puzzle[i * N + j] == 0)
                return N - i;
}

function isSolvable(puzzle) {
    let invCount = getInvCount(puzzle);

    if (N & 1)
        return !(invCount & 1);
    else {
        let pos = findXPosition(puzzle);
        if (pos & 1)
            return !(invCount & 1);
        else
            return invCount & 1;
    }
}