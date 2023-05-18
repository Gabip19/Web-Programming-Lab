<?php

function runSqlQuery($sql) {
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "ajaxweb";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $result = $conn->query($sql);
    $conn->close();
    return $result;
}

function getComboBoxContent($columnName) {
    $sql = "SELECT DISTINCT " . $columnName . " FROM laptops";
    $result = runSqlQuery($sql);
    $select_options = "<option></option>";

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $select_options .= "<option> " . $row[$columnName] . " </option>";
        }
    }

    return $select_options;
}

function buildFilterQuery($filters) {    
    $sql = "SELECT * FROM laptops";
    if (count($filters) > 0) {
        $sql .= " WHERE ";
    }

    $i = 0;
    foreach ($filters as $filter => $value) {
        if ($i === 0) {
            $sql .= $filter . " = \"" . $value . "\"";
            $i++;
        } else {
            $sql .= " AND " . $filter . " = \"" . $value . "\"";
        }
    }
    return $sql;
}

function getFilterResult($requestData) {
    $sql = buildFilterQuery($requestData);
    $result = runSqlQuery($sql);

    $content = "<tr> <th>Nume</th> <th>Producator</th> <th>Procesor</th> <th>Memorie</th> <th>Placa video</th> </tr>";

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $content .= "<tr>";
            $content .= "<td>" . $row["name"] . "</td>";
            $content .= "<td>" . $row["manufacturer"] . "</td>";
            $content .= "<td>" . $row["processor"] . "</td>";
            $content .= "<td>" . $row["memory"] . "</td>";
            $content .= "<td>" . $row["graphics"] . "</td>";
            $content .= "</tr>";
        }
    }

    return $content;
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo getComboBoxContent($_GET["comboBox"]);

} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (isset($_POST["filter"])) {
        $requestData = $_POST["filter"];
        echo getFilterResult($requestData);
    } else {
        echo getFilterResult(array());
    }
}

?>