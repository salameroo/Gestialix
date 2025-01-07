<?php
session_start();
require_once './app/Config/db.php';

// Verificar si el usuario tiene sesión activa y rol de administrador
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'adminSupremo') {
    header('Location: login.php');
    exit();
}

// Variables para mensajes
$error = '';
$success = '';

// Procesar solicitudes de agregar, editar o eliminar
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        $action = $_POST['action'];

        if ($action === 'create') {
            // Crear un nuevo colegio
            $name = trim($_POST['name']);
            $cif = trim($_POST['cif']);
            $address = trim($_POST['address']);
            $city = trim($_POST['city']);
            $state = trim($_POST['state']);
            $country = trim($_POST['country']);
            $zip = trim($_POST['zip']);

            if (empty($name) || empty($cif) || empty($address) || empty($city) || empty($state) || empty($country) || empty($zip)) {
                $error = 'Todos los campos son obligatorios.';
            } else {
                try {
                    $stmt = $pdo->prepare('INSERT INTO app_schools (name, cif, address, city, state, country, zip) 
                                           VALUES (:name, :cif, :address, :city, :state, :country, :zip)');
                    $stmt->execute([
                        ':name' => $name,
                        ':cif' => $cif,
                        ':address' => $address,
                        ':city' => $city,
                        ':state' => $state,
                        ':country' => $country,
                        ':zip' => $zip,
                    ]);
                    $success = 'Colegio creado exitosamente.';
                } catch (PDOException $e) {
                    $error = 'Error al crear el colegio: ' . $e->getMessage();
                }
            }
        } elseif ($action === 'edit') {
            // Editar un colegio existente
            $id = (int) $_POST['id'];
            $name = trim($_POST['name']);
            $cif = trim($_POST['cif']);
            $address = trim($_POST['address']);
            $city = trim($_POST['city']);
            $state = trim($_POST['state']);
            $country = trim($_POST['country']);
            $zip = trim($_POST['zip']);

            if (empty($name) || empty($cif) || empty($address) || empty($city) || empty($state) || empty($country) || empty($zip)) {
                $error = 'Todos los campos son obligatorios.';
            } else {
                try {
                    $stmt = $pdo->prepare('UPDATE app_schools SET name = :name, cif = :cif, address = :address, 
                                           city = :city, state = :state, country = :country, zip = :zip 
                                           WHERE id = :id');
                    $stmt->execute([
                        ':name' => $name,
                        ':cif' => $cif,
                        ':address' => $address,
                        ':city' => $city,
                        ':state' => $state,
                        ':country' => $country,
                        ':zip' => $zip,
                        ':id' => $id,
                    ]);
                    $success = 'Colegio actualizado exitosamente.';
                } catch (PDOException $e) {
                    $error = 'Error al actualizar el colegio: ' . $e->getMessage();
                }
            }
        } elseif ($action === 'delete') {
            // Eliminar un colegio
            $id = (int) $_POST['id'];

            try {
                $stmt = $pdo->prepare('DELETE FROM app_schools WHERE id = :id');
                $stmt->execute([':id' => $id]);
                $success = 'Colegio eliminado exitosamente.';
            } catch (PDOException $e) {
                $error = 'Error al eliminar el colegio: ' . $e->getMessage();
            }
        }
    }
}

// Obtener la lista de colegios
try {
    $stmt = $pdo->query('SELECT * FROM app_schools ORDER BY created_at DESC');
    $schools = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    $error = 'Error al obtener la lista de colegios: ' . $e->getMessage();
}
?>

<?php
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'adminSupremo') {
    header('Location: login.php');
    exit();
}
$title = 'Colegios';
include 'partials/head.php';
?>

<body>

    <?php
    if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'adminSupremo') {
        header('Location: login.php');
        exit();
    }
    include 'partials/navbar.php';
    ?>


    <?php if ($error): ?>
        <p style="color: red;"><?= htmlspecialchars($error); ?></p>
    <?php endif; ?>

    <?php if ($success): ?>
        <p style="color: green;"><?= htmlspecialchars($success); ?></p>
    <?php endif; ?>
    <div class="max-w-4xl mx-auto">

        <h2 class="text-2xl font-bold mb-4">Añadir Colegio</h2>
        <form method="POST" class="space-y-4 bg-white p-6 rounded shadow-md">
            <input type="hidden" name="action" value="create">

            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Nombre:</label>
                <input type="text" name="name" id="name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>

            <div>
                <label for="cif" class="block text-sm font-medium text-gray-700">CIF:</label>
                <input type="text" name="cif" id="cif" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>

            <div>
                <label for="address" class="block text-sm font-medium text-gray-700">Dirección:</label>
                <input type="text" name="address" id="address" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="city" class="block text-sm font-medium text-gray-700">Ciudad:</label>
                    <input type="text" name="city" id="city" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>

                <div>
                    <label for="state" class="block text-sm font-medium text-gray-700">Provincia:</label>
                    <input type="text" name="state" id="state" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="country" class="block text-sm font-medium text-gray-700">País:</label>
                    <input type="text" name="country" id="country" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>

                <div>
                    <label for="zip" class="block text-sm font-medium text-gray-700">Código Postal:</label>
                    <input type="text" name="zip" id="zip" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>
            </div>

            <button type="submit" class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Añadir</button>
        </form>

        <h2 class="text-2xl font-bold mt-8 mb-4">Lista de Colegios</h2>
        <?php if ($schools): ?>
            <div class="overflow-x-auto">
                <table class="min-w-full border border-gray-200 rounded-lg shadow-md">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="py-3 px-4 text-left font-medium text-gray-700 border-b">ID</th>
                            <th class="py-3 px-4 text-left font-medium text-gray-700 border-b">Nombre</th>
                            <th class="py-3 px-4 text-left font-medium text-gray-700 border-b">CIF</th>
                            <th class="py-3 px-4 text-left font-medium text-gray-700 border-b">Dirección</th>
                            <th class="py-3 px-4 text-left font-medium text-gray-700 border-b">Ciudad</th>
                            <th class="py-3 px-4 text-left font-medium text-gray-700 border-b">Provincia</th>
                            <th class="py-3 px-4 text-left font-medium text-gray-700 border-b">País</th>
                            <th class="py-3 px-4 text-left font-medium text-gray-700 border-b">Código Postal</th>
                            <th class="py-3 px-4 text-left font-medium text-gray-700 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($schools as $school): ?>
                            <tr class="hover:bg-gray-50">
                                <td class="py-3 px-4 border-b"><?= htmlspecialchars($school['id'] ?? ''); ?></td>
                                <td class="py-3 px-4 border-b"><?= htmlspecialchars($school['name'] ?? ''); ?></td>
                                <td class="py-3 px-4 border-b"><?= htmlspecialchars($school['cif'] ?? ''); ?></td>
                                <td class="py-3 px-4 border-b"><?= htmlspecialchars($school['address'] ?? ''); ?></td>
                                <td class="py-3 px-4 border-b"><?= htmlspecialchars($school['city'] ?? ''); ?></td>
                                <td class="py-3 px-4 border-b"><?= htmlspecialchars($school['state'] ?? ''); ?></td>
                                <td class="py-3 px-4 border-b"><?= htmlspecialchars($school['country'] ?? ''); ?></td>
                                <td class="py-3 px-4 border-b"><?= htmlspecialchars($school['zip'] ?? ''); ?></td>
                                <td class="py-3 px-4 border-b space-y-2">
                                    <form method="POST" style="display:inline;">
                                        <input type="hidden" name="action" value="edit">
                                        <input type="hidden" name="id" value="<?= htmlspecialchars($school['id'] ?? ''); ?>">
                                        <button type="submit" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 focus:outline-none">Editar</button>
                                    </form>
                                    <form method="POST" style="display:inline;">
                                        <input type="hidden" name="action" value="delete">
                                        <input type="hidden" name="id" value="<?= htmlspecialchars($school['id'] ?? ''); ?>">
                                        <button type="submit" onclick="return confirm('¿Estás seguro de que deseas eliminar este colegio?');" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none">Eliminar</button>
                                    </form>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php else: ?>
            <p class="text-gray-700">No hay colegios registrados.</p>
        <?php endif; ?>
    </div>

</body>

</html>