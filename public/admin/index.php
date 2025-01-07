<?php
session_start();
require_once './app/Config/db.php';

// Verificar si el usuario tiene sesión activa y rol de administrador
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'adminSupremo') {
    header('Location: login.php');
    exit();
}
?>

<?php
$title = 'Index';
include 'partials/head.php';
?>

<body>
    <?php include 'partials/navbar.php'; ?>
</body>

</html>