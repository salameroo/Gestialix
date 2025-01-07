<?php
session_start();
require_once './app/Config/db.php';

$error = null;
$success = null;

// Obtener usuarios y roles
$users = $pdo->query("SELECT id, name FROM laravel_users")->fetchAll();
$roles = $pdo->query("SELECT id, name FROM roles")->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $_POST['user_id'];
    $roleId = $_POST['role_id'];

    try {
        // Asignar el rol al usuario
        $stmt = $pdo->prepare("INSERT INTO model_has_roles (role_id, model_type, model_id) VALUES (?, 'App\\Models\\User', ?)");
        $stmt->execute([$roleId, $userId]);
        $success = "Rol asignado con éxito.";
    } catch (PDOException $e) {
        $error = "Error al asignar el rol: " . $e->getMessage();
    }
}
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
    include 'partials/navbar.php';
    ?>
    <h1>Asignar Rol</h1>

    <div class="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Asignar Rol</h1>

        <?php if ($error): ?>
            <p class="text-red-600 font-medium mb-4"><?= htmlspecialchars($error) ?></p>
        <?php endif; ?>
        <?php if ($success): ?>
            <p class="text-green-600 font-medium mb-4"><?= htmlspecialchars($success) ?></p>
        <?php endif; ?>

        <form action="assign_role.php" method="POST" class="space-y-4">
            <div>
                <label for="user_id" class="block text-gray-700 font-medium mb-2">Usuario:</label>
                <select
                    id="user_id"
                    name="user_id"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Seleccione un usuario</option>
                    <?php foreach ($users as $user): ?>
                        <option value="<?= $user['id'] ?>"><?= htmlspecialchars($user['name']) ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div>
                <label for="role_id" class="block text-gray-700 font-medium mb-2">Rol:</label>
                <select
                    id="role_id"
                    name="role_id"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Seleccione un rol</option>
                    <?php foreach ($roles as $role): ?>
                        <option value="<?= $role['id'] ?>"><?= htmlspecialchars($role['name']) ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <button
                type="submit"
                class="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Asignar Rol
            </button>
        </form>

        <div class="mt-4 text-center">
            <a
                href="index.php"
                class="text-blue-500 hover:underline">
                Volver al inicio
            </a>
        </div>
    </div>

</body>

</html>