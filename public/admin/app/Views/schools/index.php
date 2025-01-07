<div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Gestión de Colegios</h2>

    <a href="/?action=create" class="bg-indigo-600 text-white px-4 py-2 rounded">Añadir Colegio</a>

    <table class="min-w-full border-collapse border border-gray-200 mt-6 shadow-sm">
        <thead class="bg-gray-100">
            <tr>
                <th class="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">ID</th>
                <th class="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">Nombre</th>
                <th class="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">CIF</th>
                <th class="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">Dirección</th>
                <th class="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">Ciudad</th>
                <th class="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">Provincia</th>
                <th class="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">País</th>
                <th class="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">Código Postal</th>
                <th class="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($schools as $school): ?>
                <tr class="hover:bg-gray-50">
                    <td class="border border-gray-200 px-4 py-2 text-sm text-gray-800"><?= htmlspecialchars($school['id'] ?? 'N/A'); ?></td>
                    <td class="border border-gray-200 px-4 py-2 text-sm text-gray-800"><?= htmlspecialchars($school['name'] ?? 'N/A'); ?></td>
                    <td class="border border-gray-200 px-4 py-2 text-sm text-gray-800"><?= htmlspecialchars($school['CIF'] ?? 'N/A'); ?></td>
                    <td class="border border-gray-200 px-4 py-2 text-sm text-gray-800"><?= htmlspecialchars($school['address'] ?? 'N/A'); ?></td>
                    <td class="border border-gray-200 px-4 py-2 text-sm text-gray-800"><?= htmlspecialchars($school['city'] ?? 'N/A'); ?></td>
                    <td class="border border-gray-200 px-4 py-2 text-sm text-gray-800"><?= htmlspecialchars($school['state'] ?? 'N/A'); ?></td>
                    <td class="border border-gray-200 px-4 py-2 text-sm text-gray-800"><?= htmlspecialchars($school['country'] ?? 'N/A'); ?></td>
                    <td class="border border-gray-200 px-4 py-2 text-sm text-gray-800"><?= htmlspecialchars($school['zip'] ?? 'N/A'); ?></td>
                    <td class="border border-gray-200 px-4 py-2 text-sm text-gray-800">
                        <a href="?entity=schools&action=edit&id=<?= $school['id']; ?>" class="text-blue-500 hover:text-blue-700 underline">Editar</a>
                        <span class="text-gray-300">|</span>
                        <a href="/?action=delete&id=<?= $school['id']; ?>" class="text-red-500 hover:text-red-700 underline" onclick="return confirm('¿Seguro que deseas eliminar este colegio?');">Eliminar</a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>