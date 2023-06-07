<?php /** @noinspection SpellCheckingInspection */
session_start();

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$db = "ajaxweb";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET["page_prods"])) {
    $page_no_products = filter_var($_GET["page_prods"], FILTER_VALIDATE_INT);
    if ($page_no_products === false || $page_no_products < 1) {
        $page_no_products = 3;
    }
    $current_page = 1;
} elseif (isset($_SESSION["page_prods"])) {
    $page_no_products = $_SESSION["page_prods"];
} else {
    $page_no_products = 3;
}
$_SESSION["page_prods"] = $page_no_products;

$products_num = $conn->query("SELECT COUNT(*) FROM laptops")->fetch_row()[0];
$max_pages = ceil($products_num / $page_no_products);

if (isset($_GET["page"])) {
    $current_page = filter_var($_GET["page"], FILTER_VALIDATE_INT);
    if ($current_page === false || $current_page < 1 || $current_page > $max_pages) {
        $current_page = 1;
    }
} else {
    $current_page = 1;
}

$offset = ($current_page - 1) * $page_no_products;

$stmt = $conn->prepare("SELECT * FROM laptops LIMIT ?, ?;");
$stmt->bind_param("ii", $offset, $page_no_products);
$stmt->execute();
$result = $stmt->get_result();
$products = $result->fetch_all(MYSQLI_ASSOC);

echo "<table>";
$content = "<tr> <th>Nume</th> <th>Producator</th> <th>Procesor</th> <th>Memorie</th> <th>Placa video</th> </tr>";
foreach ($products as $produs) {
    $content .= "<tr>";
    $content .= "<td class='td'>" . htmlspecialchars($produs["name"]) . "</td>";
    $content .= "<td>" . htmlspecialchars($produs["manufacturer"]) . "</td>";
    $content .= "<td>" . htmlspecialchars($produs["processor"]) . "</td>";
    $content .= "<td>" . htmlspecialchars($produs["memory"]) . "</td>";
    $content .= "<td>" . htmlspecialchars($produs["graphics"]) . "</td>";
    $content .= "</tr>";
}
echo $content;
echo "</table>";

if ($current_page > 1) {
    echo '<a href="?page=' . ($current_page - 1) . '"> Prev </a>';
}

if ($current_page < $max_pages) {
    echo '<a href="?page=' . ($current_page + 1) . '"> Next </a>';
}

?>

<style>
    table {
        border-collapse: collapse;
        border: 1px solid black;
    }
    td, th {
        border: 1px solid black;
    }
    a {
        background-color: aquamarine;
        color: black;
        font-size: 15px;
        padding: 5px;
        margin: 5px;
        display: inline-block;
        text-decoration: none;
    }
</style>

<form method="get" action="server.php">
    <select name="page_prods">
        <option value="3" <?php if ($page_no_products == 3) echo 'selected';?>> 3 </option>
        <option value="5" <?php if ($page_no_products == 5) echo 'selected';?>> 5 </option>
        <option value="7" <?php if ($page_no_products == 7) echo 'selected';?>> 7 </option>
    </select>
    <input type="submit" value="Set">
</form>
