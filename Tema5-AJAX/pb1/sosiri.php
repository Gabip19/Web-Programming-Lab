<?php
    header("Acces-Control-Allow-Origin: *");

    $plecare = $_GET["plecare"];
    $select_options = "";

    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "ajaxweb";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT sosiri FROM trenuri WHERE plecari = ?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $plecare);
    $stmt->execute();
    $stmt->bind_result($result);

    while ($stmt->fetch()) {
        $select_options .= "<option> " . $result . " </option>";
    }

    $conn->close();
    echo $select_options;
?>