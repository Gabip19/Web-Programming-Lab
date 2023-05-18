<?php
    header("Acces-Control-Allow-Origin: *");

    $select_options = "";

    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "ajaxweb";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT DISTINCT plecari FROM trenuri";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $select_options .= "<option> " . $row["plecari"] . " </option>";
        }
    }

    $conn->close();
    echo $select_options;
?>