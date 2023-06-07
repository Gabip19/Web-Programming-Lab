<?php /** @noinspection SpellCheckingInspection */
require 'vendor/autoload.php';

$transport = new Swift_SmtpTransport('smtp.gmail.com', 587);
$transport->setUsername('adresa_de_email');
$transport->setPassword('parola_de_email');

$mailer = new Swift_Mailer($transport);

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$db = "ajaxweb";

$conn = new mysqli($dbhost, $dbuser, $dbpass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Register
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["register"])) {
    // Validarea date
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $password = filter_var($_POST["password"], FILTER_SANITIZE_STRING);

    // Generarea cod unic pt confirmare
    $confirmationCode = md5(uniqid(rand(), true));

    // Verificarea existenta email
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $error = "E-mail-ul exista deja.";
    } else {

        // Salvarea date
        $sql = "INSERT INTO users (name, email, password, confirmation_code) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $name, $email, $password, $confirmationCode);
        $stmt->execute();

        // Creare mesaj
        $message = new Swift_Message('Confirmare inregistrare');
        $message->setFrom(['adresa_de_email' => 'Expeditor']);
        $message->setTo([$email => $name]);
        $message->setBody("Accesati urmatorul link pentru confirmare: http://localhost/phpweb/pb4/confirmare.php?cod={$confirmationCode}");

        // Trimite mesajul
        $result = $mailer->send($message);

        // Redirectioneaza pagina
        echo "<p> VERIFICA MAIL!!! </p>";
        exit;
    }
}

// Login
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["login"])) {
    // Validarea si filtrarea datelor introduse de utilizator
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $password = filter_var($_POST["password"], FILTER_SANITIZE_STRING);

    // Verificarea existenta utilizator
    $sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        echo 'AUTENTIFICAT!!!';
        exit;
    } else {
        $error = "Utilizatorul nu exista sau datele introduse sunt incorecte.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title> Problema 4 </title>
</head>
<body>
<?php if (isset($error)): ?>
    <p><?php echo $error; ?></p>
<?php endif; ?>
<h1>Autentificare</h1>

<form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
    <label for="email"> E-mail: </label>
    <input type="email" name="email" id="email" required>
    <label for="password"> Password: </label>
    <input type="password" name="password" id="password" required>
    <button type="submit" name="login"> Login </button>
</form>

<h1> Register </h1>
<form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
    <label for="name_input"> Name: </label>
    <input type="text" name="name" id="name_input" required>
    <label for="email_input"> E-mail: </label>
    <input type="email" name="email" id="email_input" required>
    <label for="password_input"> Password: </label>
    <input type="password" name="password" id="password_input" required>
    <button type="submit" name="register"> Register </button>
</form>
</body>
</html>