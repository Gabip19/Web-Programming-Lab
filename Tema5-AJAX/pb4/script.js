var user = "";
var server = "";

$(function() {
    let num = Math.floor(Math.random() * 10);
    if (num % 2 == 0) {
        user = "O";
        server = "X";
        startGame();
        serverMove();
    } else {
        user = "X";
        server = "O";
        startGame();
    }

    $("#board td").click(function() {
        console.log($(this).html());
        if ($(this).html() == "") {
            $(this).html(user);
            makeMove($(this).parent().index(), $(this).index());
        }
    });
})

function startGame() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://localhost/ajaxweb/pb4/checkwin.php?start=1&user=" + user + "&server=" + server, false);
    xmlhttp.send();
}

function makeMove(row, col) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (!gameEnded(this.responseText)) {
                serverMove();
            }
        }
    }
    xmlhttp.open("GET", "http://localhost/ajaxweb/pb4/checkwin.php?player=" + user + "&row=" + row + "&col=" + col, true);
    xmlhttp.send();
}

function serverMove() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (!gameEnded(this.responseText)) {
                let serverMove = JSON.parse(this.responseText);
                document.getElementById("board").rows[serverMove[0]].cells[serverMove[1]].innerHTML = server;
            }
        }
    }
    xmlhttp.open("GET", "http://localhost/ajaxweb/pb4/checkwin.php?player=" + server, true);
    xmlhttp.send();
}

function gameEnded(responseText) {
    if (responseText == user) {
        alert("YOU WON!!! CONGRATSSS!!");
        return true;
    } else if (responseText == server) {
        alert("You lost this time... Try again!");
        return true;
    } else if (responseText == "TIE") {
        alert("TIE GAME!");
        return true;
    }
    return false;
}