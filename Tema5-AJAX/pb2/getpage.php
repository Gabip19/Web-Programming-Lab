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

    $pageNumber = $_GET["index"];
    $pageSize = $_GET["size"];
    $end = $pageNumber * $pageSize;
    $start = $end - $pageSize;
    $count = 0;

    $sql = "SELECT * FROM persoane";
    $result = $conn->query($sql);
    $tableContent = "<tr><th>Nume</th><th>Prenume</th><th>Telefon</th><th>Email</th></tr>";

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            if ($start <= $count && $count < $end) {
                $tableContent .= "<tr>";
                $tableContent .= "<td>" . $row["nume"] . "</td>";
                $tableContent .= "<td>" . $row["prenume"] . "</td>";
                $tableContent .= "<td>" . $row["telefon"] . "</td>";
                $tableContent .= "<td>" . $row["email"] . "</td>";
                $tableContent .= "</tr>";
            }
            $count++;
        }
    }

    $conn->close();
    echo $tableContent;
?>