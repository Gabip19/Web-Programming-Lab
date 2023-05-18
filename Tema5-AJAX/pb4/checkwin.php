<?php
    session_start();

    if (isset($_GET["start"])) {
        $_SESSION["gameBoard"] = array(
            array("", "", ""),
            array("", "", ""),
            array("", "", "")
        );
        $_SESSION["user"] = $_GET["user"];
        $_SESSION["server"] = $_GET["server"];
        echo "started";
        die();
    }

    function checkWinning($board, $symbol) {
        // randuri
        for ($i = 0; $i < 3; $i++) {
            if ($board[$i][0] == $symbol && $board[$i][1] == $symbol && $board[$i][2] == $symbol) {
                return $symbol;
            }
        }
        // coloane
        for ($i = 0; $i < 3; $i++) {
            if ($board[0][$i] == $symbol && $board[1][$i] == $symbol && $board[2][$i] == $symbol) {
                return $symbol;
            }
        }
        // diagonale
        if ($board[0][0] == $symbol && $board[1][1] == $symbol && $board[2][2] == $symbol) {
            return $symbol;
        }
        if ($board[0][2] == $symbol && $board[1][1] == $symbol && $board[2][0] == $symbol) {
            return $symbol;
        }

        $empty = array();
        for ($i=0; $i < 3; $i++) {
            for ($j=0; $j < 3; $j++) { 
                if ($board[$i][$j] == "") {
                    array_push($empty, array($i, $j));
                }
            }
        }
        if (count($empty) === 0) {
            return "TIE";
        }

        return "continue";
    }

    $board = $_SESSION["gameBoard"];
    $player = $_GET["player"];
    $user = $_SESSION["user"];
    $server = $_SESSION["server"];
    
    if ($player == $user) {
        $row = $_GET["row"];
        $col = $_GET["col"];
        $board[$row][$col] = $player;

        echo checkWinning($board, $player);
    }
    else if ($player == $server) {
        $empty = array();
        for ($i=0; $i < 3; $i++) {
            for ($j=0; $j < 3; $j++) { 
                if ($board[$i][$j] == "") {
                    array_push($empty, array($i, $j));
                }
            }
        }
        $len = count($empty);
        $serverMove = $empty[rand(0, $len - 1)];
        $board[$serverMove[0]][$serverMove[1]] = $player;

        $result = checkWinning($board, $player);

        if ($result === "continue") {
            echo json_encode($serverMove);
        } else {
            echo $result;
        }
    }

    $_SESSION['gameBoard'] = $board;
?>