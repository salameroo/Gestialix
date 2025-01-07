<?php require __DIR__ . '/../layout.php'; ?>

<div class="container mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Iniciar Sesión</h2>

    <form method="POST" action="/login.php" class="space-y-4 bg-white p-6 rounded shadow-md">
        <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Usuario:</label>
            <input type="text" name="username" id="username" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>

        <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña:</label>
            <input type="password" name="password" id="password" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>

        <?php if (isset($_GET['error'])): ?>
            <p class="text-red-500"><?= htmlspecialchars($_GET['error']); ?></p>
        <?php endif; ?>

        <button type="submit" class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Iniciar Sesión</button>
    </form>
</div>
