<h2 class="text-xl font-bold mb-4"><?= $title = "Registro Usuarios"; ?></h2>

<form method="POST" action="/?entity=users&action=<?= isset($user) ? 'update&id=' . $user['id'] : 'store'; ?>" class="space-y-4">
    <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nombre:</label>
        <input type="text" name="name" id="name" required value="<?= htmlspecialchars($user['name'] ?? ''); ?>" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
    </div>

    <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
        <input type="email" name="email" id="email" required value="<?= htmlspecialchars($user['email'] ?? ''); ?>" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
    </div>

    <?php if (!isset($user)): ?>
        <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña:</label>
            <input type="password" name="password" id="password" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>
    <?php endif; ?>

    <!-- Desplegable de Colegios -->
    <div>
        <label for="school_id" class="block text-sm font-medium text-gray-700">Colegio:</label>
        <select name="school_id" id="school_id" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="">Seleccionar un Colegio</option>
            <?php foreach ($schools as $school): ?>
                <option value="<?= htmlspecialchars($school['id']); ?>" <?= isset($user) && $user['school_id'] == $school['id'] ? 'selected' : ''; ?>>
                    <?= htmlspecialchars($school['name']); ?>
                </option>
            <?php endforeach; ?>
        </select>
    </div>

    <button type="submit" class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <?= isset($user) ? 'Actualizar Usuario' : 'Registrar Usuario'; ?>
    </button>
</form>