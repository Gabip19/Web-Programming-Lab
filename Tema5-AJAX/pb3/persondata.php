<?php
    header("Acces-Control-Allow-Origin: *");

    $id = $_GET["id"];

    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "ajaxweb";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT nume, prenume, telefon, email FROM persoane WHERE id = " . $id;
    $result = $conn->query($sql);

    $response = $result->fetch_assoc();

    $conn->close();
    header("Content-Type: application/json");
    echo json_encode($response);
?>