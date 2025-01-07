<?php
session_start();
require_once './app/Config/db.php';

// Verificar si el usuario tiene sesión activa y rol de administrador
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'adminSupremo') {
    header('Location: login.php');
    exit();
}

// Variables para manejar errores y mensajes
$error = '';
$success = '';

// Procesar el formulario de registro
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $role = trim($_POST['role']);
    $school = trim($_POST['school']);

    if (empty($username) || empty($password) || empty($role) || empty($school)) {
        $error = 'Todos los campos son obligatorios.';
    } else {
        try {
            // Hashear la contraseña
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            // Insertar usuario en la base de datos
            $stmt = $pdo->prepare('INSERT INTO laravel_users (username, password, role, school) VALUES (:username, :password, :role, :school)');
            $stmt->execute([
                ':username' => $username,
                ':password' => $hashedPassword,
                ':role' => $role,
                ':school' => $school,
            ]);
            $success = 'Usuario registrado exitosamente.';
        } catch (PDOException $e) {
            $error = 'Error al registrar el usuario: ' . $e->getMessage();
        }
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
    if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'adminSupremo') {
        header('Location: login.php');
        exit();
    }
    include 'partials/navbar.php';
    ?>

    <div class="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg mb-4">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Registrar Usuario</h1>

        <?php if ($error): ?>
            <p class="text-red-600 font-medium mb-4"><?= htmlspecialchars($error); ?></p>
        <?php endif; ?>

        <?php if ($success): ?>
            <p class="text-green-600 font-medium mb-4"><?= htmlspecialchars($success); ?></p>
        <?php endif; ?>

        <form method="POST" class="space-y-4">
            <div>
                <label for="username" class="block text-gray-700 font-medium mb-2">Nombre de Usuario:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
                <label for="password" class="block text-gray-700 font-medium mb-2">Contraseña:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
                <label for="role" class="block text-gray-700 font-medium mb-2">Rol:</label>
                <select
                    name="role"
                    id="role"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="adminSupremo">Admin Supremo</option>
                    <option value="admin">Administrador</option>
                    <option value="usuario">Usuario</option>
                </select>
            </div>

            <div>
                <label for="school" class="block text-gray-700 font-medium mb-2">Colegio:</label>
                <input
                    type="text"
                    name="school"
                    id="school"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <button
                type="submit"
                class="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Registrar
            </button>
        </form>
    </div>

</body>

</html>