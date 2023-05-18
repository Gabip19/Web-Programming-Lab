<?php
    header("Acces-Control-Allow-Origin: *");

    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "ajaxweb";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT COUNT(*) FROM persoane";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $stmt->bind_result($result);

    $stmt->fetch();
    echo $result;

    $conn->close();
?>