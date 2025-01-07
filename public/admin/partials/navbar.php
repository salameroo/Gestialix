<div class="min-h-full">
    <div class="bg-indigo-600 pb-32">
        <header class="py-10">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-white">
                    Bienvenido, <?= htmlspecialchars($_SESSION['user']['username']); ?> 👋
                </h1>
            </div>
        </header>
    </div>

    <main class="-mt-32">
        <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                <nav class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <a href="register.php" class="group relative rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500 transition-all duration-300 ease-in-out">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-user-plus text-sky-500 group-hover:text-white transition-colors duration-300"></i>
                            <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold transition-colors duration-300">Registrar Usuario</h3>
                        </div>
                        <p class="text-slate-500 group-hover:text-white text-sm transition-colors duration-300">Añade nuevos usuarios al sistema.</p>
                    </a>

                    <a href="manage_schools.php" class="group relative rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-green-500 hover:ring-green-500 transition-all duration-300 ease-in-out">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-school text-green-500 group-hover:text-white transition-colors duration-300"></i>
                            <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold transition-colors duration-300">Manejar Colegios</h3>
                        </div>
                        <p class="text-slate-500 group-hover:text-white text-sm transition-colors duration-300">Gestiona la información de los colegios.</p>
                    </a>

                    <a href="assign_role.php" class="group relative rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-yellow-500 hover:ring-yellow-500 transition-all duration-300 ease-in-out">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-user-tag text-yellow-500 group-hover:text-white transition-colors duration-300"></i>
                            <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold transition-colors duration-300">Asignar Roles</h3>
                        </div>
                        <p class="text-slate-500 group-hover:text-white text-sm transition-colors duration-300">Asigna roles a los usuarios del sistema.</p>
                    </a>

                    <a href="list_users.php" class="group relative rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-purple-500 hover:ring-purple-500 transition-all duration-300 ease-in-out">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-users text-purple-500 group-hover:text-white transition-colors duration-300"></i>
                            <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold transition-colors duration-300">Listar Usuarios y Roles</h3>
                        </div>
                        <p class="text-slate-500 group-hover:text-white text-sm transition-colors duration-300">Visualiza todos los usuarios y sus roles.</p>
                    </a>

                    <a href="manage_roles_permissions.php" class="group relative rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-red-500 hover:ring-red-500 transition-all duration-300 ease-in-out">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-shield-alt text-red-500 group-hover:text-white transition-colors duration-300"></i>
                            <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold transition-colors duration-300">Gestionar Roles y Permisos</h3>
                        </div>
                        <p class="text-slate-500 group-hover:text-white text-sm transition-colors duration-300">Administra los roles y permisos del sistema.</p>
                    </a>

                    <a href="logout.php" class="group relative rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-gray-500 hover:ring-gray-500 transition-all duration-300 ease-in-out">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-sign-out-alt text-gray-500 group-hover:text-white transition-colors duration-300"></i>
                            <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold transition-colors duration-300">Cerrar Sesión</h3>
                        </div>
                        <p class="text-slate-500 group-hover:text-white text-sm transition-colors duration-300">Salir del sistema de administración.</p>
                    </a>
                </nav>
            </div>
        </div>
    </main>
</div>