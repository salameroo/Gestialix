<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../Middleware/AuthMiddleware.php';
require_once __DIR__ . '/../Controllers/UserController.php';

AuthMiddleware::handle();

$pdo = require __DIR__ . '/../config/db.php';
$userController = new UserController($pdo);

$userController->index(); // Lista los usuarios del sistema Laravel
