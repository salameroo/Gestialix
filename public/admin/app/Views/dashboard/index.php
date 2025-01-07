<?php
$title = 'Dashboard';
ob_start();
?>

<h1 class="text-2xl font-bold mb-4">Panel de Administración</h1>
<p class="text-gray-600">Selecciona una opción en el menú para empezar.</p>

<nav class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
    <a href="/?entity=users&action=create" class="group relative rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500 transition-all duration-300 ease-in-out">
        <div class="flex items-center space-x-3">
            <i class="fas fa-user-plus text-sky-500 group-hover:text-white transition-colors duration-300"></i>
            <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold transition-colors duration-300">Registrar Usuario</h3>
        </div>
        <p class="text-slate-500 group-hover:text-white text-sm transition-colors duration-300">Añade nuevos usuarios al sistema.</p>
    </a>

    <a href="/?entity=schools&action=index" class="group relative rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-green-500 hover:ring-green-500 transition-all duration-300 ease-in-out">
        <div class="flex items-center space-x-3">
            <i class="fas fa-school text-green-500 group-hover:text-white transition-colors duration-300"></i>
            <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold transition-colors duration-300">Manejar Colegios</h3>
        </div>
        <p class="text-slate-500 group-hover:text-white text-sm transition-colors duration-300">Gestiona la información de los colegios.</p>
    </a>

    <a href="/?entity=roles&action=index" class="group relative rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-yellow-500 hover:ring-yellow-500 transition-all duration-300 ease-in-out">
        <div class="flex items-center space-x-3">
            <i class="fas fa-user-tag text-yellow-500 group-hover:text-white transition-colors duration-300"></i>
            <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold transition-colors duration-300">Asignar Roles</h3>
        </div>
        <p class="text-slate-500 group-hover:text-white text-sm transition-colors duration-300">Asigna roles a los usuarios del sistema.</p>
    </a>
</nav>

<?php
$content = ob_get_clean();
require __DIR__ . '/../layout.php';
