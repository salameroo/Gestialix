<?php

// Requiere la configuración y controladores necesarios
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../Middleware/AuthMiddleware.php';
require_once __DIR__ . '/../Controllers/UserController.php';
require_once __DIR__ . '/../Controllers/SchoolController.php';
require_once __DIR__ . '/../Controllers/RoleController.php';
require_once __DIR__ . '/../Controllers/AuthController.php';

AuthMiddleware::handle();

// Conexión a la base de datos
$pdo = require __DIR__ . '/../config/db.php';

// Entidad y acción desde la URL
$entity = $_GET['entity'] ?? 'dashboard'; // Redirigir al dashboard si no se especifica la entidad
$action = $_GET['action'] ?? 'index';

// Selección del controlador según la entidad
if ($entity === 'dashboard') {
    // Si la entidad es 'dashboard', muestra la vista del dashboard
    require_once __DIR__ . '/../Views/dashboard/index.php';
    exit;
} elseif ($entity === 'users') {
    $controller = new UserController($pdo);
} elseif ($entity === 'schools') {
    $controller = new SchoolController($pdo);
} elseif ($entity === 'roles') {
    $controller = new RoleController($pdo);
} elseif ($entity === 'auth') {
    $controller = new AuthController($pdo);
} else {
    echo 'Entidad no encontrada.';
    exit;
}

// Ejecución de la acción correspondiente
switch ($action) {
    case 'index':
        $controller->index();
        break;
    case 'create':
        $controller->create();
        break;
    case 'store':
        $controller->store($_POST);
        break;
    case 'edit':
        $id = $_GET['id'] ?? null;
        $controller->edit($id);
        break;
    case 'update':
        $id = $_GET['id'] ?? null;
        $controller->update($id, $_POST);
        break;
    case 'delete':
        $id = $_GET['id'] ?? null;
        $controller->destroy($id);
        break;
    case 'assign':
        $controller->assign($_POST);
        break;
    case 'logout':
        $controller->logout();
        break;
    default:
        echo 'Acción no encontrada.';
}
