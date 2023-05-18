<?php
    header("Access-Control-Allow-Origin: *");
    header("Acces-Control-Allow-Origin: *");

    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "ajaxweb";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "UPDATE persoane SET nume=?, prenume=?, telefon=?, email=? WHERE id=?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssd", $_POST["name"], $_POST["surname"], $_POST["phone"], $_POST["email"], $_POST["id"]);
    $stmt->execute();
 ?>