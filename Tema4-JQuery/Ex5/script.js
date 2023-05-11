$(function () {
    generateTable();
    $(document).keydown(checkKey);
});

var N = 3;
var empty = null;
var numbers = [];

function generateTable() {
    let table = $("#board").empty();

    N = $("#nValue").val();
    console.log("N: " + N);
    if (N < 3) {
        return;
    }

    numbers = generateNumbers(N * N);

    for (let i = 0; i < N; i++) {
        let row = $("<tr></tr>");
        for (let j = 0; j < N; j++) {
            let column = $("<td></td>");

            elem = numbers[i * N + j];
            if (elem != N * N) {
                column.html(elem);
                column.attr("id", elem);
            } else {
                empty = column;
                column.attr("id", N * N);
            }

            console.log(column.attr("id"));
            row.append(column);
        }
        table.append(row);
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
    if (e.keyCode == "38") {
        console.log("SUS");
        swap(empty, empty.parent().prev().children(":nth-child(" + (empty.index() + 1) + ")"));
    } else if (e.keyCode == "40") {
        console.log("JOS");
        swap(empty, empty.parent().next().children(":nth-child(" + (empty.index() + 1) + ")"));
    } else if (e.keyCode == "37") {
        console.log("STANGA");
        swap(empty, empty.prev());
    } else if (e.keyCode == "39") {
        console.log("DREAPTA");
        swap(empty, empty.next());
    }

    if (hasWon()) {
        alert("Ai castigat!!! Congrats!!!");
    }
}

function swap(elem1, elem2) {
    if (elem2.length == 0) {
        console.log("Couldn't swap.");
        return;
    }

    console.log("Swapping " + elem1.html() + " " + elem2.html());

    let auxHtml = elem1.html();
    elem1.html(elem2.html());
    elem2.html(auxHtml);

    let auxId = elem1.attr("id");
    elem1.attr("id", elem2.attr("id"));
    elem2.attr("id", auxId);

    empty = elem2;
    console.log("Empty: " + empty);
}

function hasWon() {
    let all = $("#board").find("td").toArray();
    for (let i = 0; i < all.length - 1; i++) {
        if (parseInt(all[i].id) != parseInt(all[i + 1].id) - 1)
            return false;
    }
    return true;
}

// check if solvable

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