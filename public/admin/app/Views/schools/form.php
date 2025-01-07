<div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4"><?= isset($school) ? 'Editar Colegio' : 'Añadir Colegio'; ?></h2>

    <form method="POST" action="<?= isset($school) ? '/?entity=schools&action=update&id=' . $school['id'] : '/?entity=schools&action=store'; ?>" class="space-y-4 bg-white p-6 rounded shadow-md">
        <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre:</label>
            <input type="text" name="name" id="name" required value="<?= htmlspecialchars($school['name'] ?? ''); ?>" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>

        <div>
            <label for="cif" class="block text-sm font-medium text-gray-700">CIF:</label>
            <input type="text" name="cif" id="cif" required value="<?= htmlspecialchars($school['cif'] ?? ''); ?>" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>

        <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Dirección:</label>
            <input type="text" name="address" id="address" required value="<?= htmlspecialchars($school['address'] ?? ''); ?>" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label for="city" class="block text-sm font-medium text-gray-700">Ciudad:</label>
                <input type="text" name="city" id="city" required value="<?= htmlspecialchars($school['city'] ?? ''); ?>" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>

            <div>
                <label for="state" class="block text-sm font-medium text-gray-700">Provincia:</label>
                <input type="text" name="state" id="state" required value="<?= htmlspecialchars($school['state'] ?? ''); ?>" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label for="country" class="block text-sm font-medium text-gray-700">País:</label>
                <input type="text" name="country" id="country" required value="<?= htmlspecialchars($school['country'] ?? ''); ?>" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>

            <div>
                <label for="zip" class="block text-sm font-medium text-gray-700">Código Postal:</label>
                <input type="text" name="zip" id="zip" required value="<?= htmlspecialchars($school['zip'] ?? ''); ?>" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>
        </div>

        <button type="submit" class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <?= isset($school) ? 'Actualizar Colegio' : 'Añadir Colegio'; ?>
        </button>
    </form>
</div>