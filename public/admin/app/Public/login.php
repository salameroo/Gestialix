<?php

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../Controllers/AuthController.php';

$pdo = require __DIR__ . '/../config/db.php';
$authController = new AuthController($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $authController->login($_POST);
} else {
    $authController->showLogin();
}
