<div class="container mx-auto p-6 w-full">
    <h2 class="text-2xl font-bold mb-4">Gestión de Roles</h2>

    <a href="/?entity=roles&action=create" class="bg-indigo-600 text-white px-4 py-2 rounded-md">Crear Rol</a>

    <table class="min-w-full border mt-6">
        <thead class="bg-gray-100">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($roles as $role): ?>
                <tr>
                    <td><?= htmlspecialchars($role['id']); ?></td>
                    <td><?= htmlspecialchars($role['name']); ?></td>
                    <td>
                        <a href="/?entity=roles&action=edit&id=<?= $role['id']; ?>" class="text-blue-500">Editar</a>
                        <a href="/?entity=roles&action=delete&id=<?= $role['id']; ?>" class="text-red-500" onclick="return confirm('¿Seguro que deseas eliminar este rol?');">Eliminar</a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>