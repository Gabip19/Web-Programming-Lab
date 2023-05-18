<?php
    header("Access-Control-Allow-Origin: *");

    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "ajaxweb";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT id FROM persoane";
    $result = $conn->query($sql);

    $select_options = "";

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $select_options .= "<option> " . $row["id"] . " </option>";
        }
    }

    $conn->close();
    echo $select_options;
?>