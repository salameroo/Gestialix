<?php

require_once __DIR__ . '/../Controllers/AuthController.php';

$authController = new AuthController(null);
$authController->logout();
