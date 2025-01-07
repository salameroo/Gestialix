<?php
$title = 'Gestión de Usuarios';
?>

<h2 class="text-xl font-bold mb-4">Lista de Usuarios</h2>

<table class="min-w-full border mt-6">
    <thead class="bg-gray-100">
        <tr>
            <th class="px-4 py-2 text-left">ID</th>
            <th class="px-4 py-2 text-left">Nombre</th>
            <th class="px-4 py-2 text-left">Correo</th>
            <th class="px-4 py-2 text-left">Colegio</th>
            <th class="px-4 py-2 text-left">Rol</th>
            <th class="px-4 py-2 text-left">Acciones</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($users as $user): ?>
            <tr>
                <td class="border px-4 py-2"><?= htmlspecialchars($user['id']); ?></td>
                <td class="border px-4 py-2"><?= htmlspecialchars($user['name']); ?></td>
                <td class="border px-4 py-2"><?= htmlspecialchars($user['email']); ?></td>
                <td class="border px-4 py-2"><?= htmlspecialchars($user['school_name'] ?? 'Sin Colegio'); ?></td>
                <td class="border px-4 py-2"><?= htmlspecialchars($user['role'] ?? 'Sin Rol'); ?></td>
                <td class="border px-4 py-2">
                    <a href="/?entity=users&action=edit&id=<?= $user['id']; ?>" class="text-blue-500">Editar</a>
                    <a href="/?entity=users&action=delete&id=<?= $user['id']; ?>" class="text-red-500" onclick="return confirm('¿Seguro que deseas eliminar este usuario?');">Eliminar</a>
                </td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>