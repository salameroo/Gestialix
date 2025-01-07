<?php
session_start();
require_once './app/Config/db.php';

$users = $pdo->query("
    SELECT users.id, users.name, users.email, roles.name AS role_name
    FROM laravel_users AS users
    LEFT JOIN model_has_roles ON users.id = model_has_roles.model_id
    LEFT JOIN roles ON model_has_roles.role_id = roles.id
")->fetchAll();
?>

<?php
// Importar el head y el header
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'adminSupremo') {
    header('Location: login.php');
    exit();
}
$title = 'Registrar Usuario';
include 'partials/head.php';
?>

<body>
    <?php
    // Importar el navbar
    if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'adminSupremo') {
        header('Location: login.php');
        exit();
    }
    include 'partials/navbar.php';
    ?>
    <div class="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Usuarios y Roles</h1>

        <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-gray-200 rounded-md shadow-sm">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-4 py-2 border border-gray-300 text-left text-gray-600 font-medium">Nombre</th>
                        <th class="px-4 py-2 border border-gray-300 text-left text-gray-600 font-medium">Email</th>
                        <th class="px-4 py-2 border border-gray-300 text-left text-gray-600 font-medium">Rol</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($users as $user): ?>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-2 border border-gray-300 text-gray-700"><?= htmlspecialchars($user['name']) ?></td>
                            <td class="px-4 py-2 border border-gray-300 text-gray-700"><?= htmlspecialchars($user['email']) ?></td>
                            <td class="px-4 py-2 border border-gray-300 text-gray-700"><?= htmlspecialchars($user['role_name'] ?? 'Sin Rol') ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

</body>

</html>