<div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4"><?= isset($role) ? 'Editar Rol' : 'Añadir Rol'; ?></h2>

    <form method="POST" action="<?= isset($role) ? '/?entity=roles&action=update&id=' . $role->id : '/?entity=roles&action=store'; ?>" class="space-y-4 bg-white p-6 rounded shadow-md">
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre del Rol:</label>
            <input type="text" name="name" id="name" required value="<?= htmlspecialchars($role->name ?? ''); ?>" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>

        <button type="submit" class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <?= isset($role) ? 'Actualizar Rol' : 'Añadir Rol'; ?>
        </button>
    </form>
</div>