<?php
session_start();
require_once './app/Config/db.php';

$error = null;
$success = null;

// Obtener roles y permisos para mostrarlos
$roles = $pdo->query("SELECT * FROM roles")->fetchAll();
$permissions = $pdo->query("SELECT * FROM permissions")->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['create_role'])) {
        // Crear un nuevo rol
        $roleName = $_POST['role_name'];
        try {
            $stmt = $pdo->prepare("INSERT INTO roles (name, guard_name, created_at, updated_at) VALUES (?, 'web', NOW(), NOW())");
            $stmt->execute([$roleName]);
            $success = "Rol creado con éxito.";
        } catch (PDOException $e) {
            $error = "Error al crear el rol: " . $e->getMessage();
        }
    } elseif (isset($_POST['create_permission'])) {
        // Crear un nuevo permiso
        $permissionName = $_POST['permission_name'];
        try {
            $stmt = $pdo->prepare("INSERT INTO permissions (name, guard_name, created_at, updated_at) VALUES (?, 'web', NOW(), NOW())");
            $stmt->execute([$permissionName]);
            $success = "Permiso creado con éxito.";
        } catch (PDOException $e) {
            $error = "Error al crear el permiso: " . $e->getMessage();
        }
    } elseif (isset($_POST['assign_permission'])) {
        // Asignar un permiso a un rol
        $roleId = $_POST['role_id'];
        $permissionId = $_POST['permission_id'];
        try {
            $stmt = $pdo->prepare("INSERT INTO role_has_permissions (role_id, permission_id) VALUES (?, ?)");
            $stmt->execute([$roleId, $permissionId]);
            $success = "Permiso asignado al rol con éxito.";
        } catch (PDOException $e) {
            $error = "Error al asignar el permiso: " . $e->getMessage();
        }
    }
}
?>

<?php
// Importar el navbar
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'adminSupremo') {
    header('Location: login.php');
    exit();
}
$title = 'Gestionar Roles y Permisos';
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
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Gestionar Roles y Permisos</h1>

        <?php if ($error): ?>
            <p class="text-red-600 font-medium mb-4"><?= htmlspecialchars($error) ?></p>
        <?php endif; ?>
        <?php if ($success): ?>
            <p class="text-green-600 font-medium mb-4"><?= htmlspecialchars($success) ?></p>
        <?php endif; ?>

        <!-- Crear un nuevo rol -->
        <div class="mb-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-700">Crear Rol</h2>
            <form action="manage_roles_permissions.php" method="POST" class="space-y-4">
                <div>
                    <label for="role_name" class="block text-gray-700 font-medium mb-2">Nombre del Rol:</label>
                    <input
                        type="text"
                        id="role_name"
                        name="role_name"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <button
                    type="submit"
                    name="create_role"
                    class="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Crear Rol
                </button>
            </form>
        </div>

        <!-- Crear un nuevo permiso -->
        <div class="mb-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-700">Crear Permiso</h2>
            <form action="manage_roles_permissions.php" method="POST" class="space-y-4">
                <div>
                    <label for="permission_name" class="block text-gray-700 font-medium mb-2">Nombre del Permiso:</label>
                    <input
                        type="text"
                        id="permission_name"
                        name="permission_name"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <button
                    type="submit"
                    name="create_permission"
                    class="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Crear Permiso
                </button>
            </form>
        </div>

        <!-- Asignar un permiso a un rol -->
        <div>
            <h2 class="text-xl font-semibold mb-4 text-gray-700">Asignar Permiso a Rol</h2>
            <form action="manage_roles_permissions.php" method="POST" class="space-y-4">
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

                <div>
                    <label for="permission_id" class="block text-gray-700 font-medium mb-2">Permiso:</label>
                    <select
                        id="permission_id"
                        name="permission_id"
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Seleccione un permiso</option>
                        <?php foreach ($permissions as $permission): ?>
                            <option value="<?= $permission['id'] ?>"><?= htmlspecialchars($permission['name']) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <button
                    type="submit"
                    name="assign_permission"
                    class="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Asignar Permiso
                </button>
            </form>
        </div>
    </div>

    <a href="index.php">Volver al inicio</a>
</body>

</html>