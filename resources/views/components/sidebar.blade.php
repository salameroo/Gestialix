<!-- resources/views/components/sidebar.blade.php -->
<div
    x-data="{ isOpen: false, isMobile: window.innerWidth < 768 }"
    @resize.window="isMobile = window.innerWidth < 768"
    class="fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-lg transition-all duration-300 ease-in-out"
    :class="{ 'w-64': isOpen, 'w-20': !isOpen, '-translate-x-full': isMobile && !isOpen }">
    <!-- Botón de toggle -->
    <button
        @click="isOpen = !isOpen"
        class="absolute top-4 -right-12 bg-white p-2 rounded-full shadow-md transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
        aria-label="Toggle menu">
        <template x-if="isOpen">
            <x-icons.x class="w-6 h-6" />
        </template>
        <template x-if="!isOpen">
            <x-icons.menu class="w-6 h-6" />
        </template>
    </button>

    <!-- Logo -->
    <div class="flex items-center justify-center h-20">
        <img src="/images/logoGestialix.svg" alt="Logo" class="w-10 h-10">
        <template x-if="isOpen">
            <h1 class="ml-4 text-xl font-bold">Gestialix</h1>
        </template>
    </div>

    <!-- Navegación -->
    <nav class="flex-grow">
        <ul class="space-y-2 py-4">
            <x-sidebar-item route="inicio" label="Inicio" icon="home" :isOpen="isOpen" />
            <x-sidebar-item route="clientes" label="Clientes" icon="users" :isOpen="isOpen" />
            <x-sidebar-item route="dashboard" label="Panel de control" icon="bar-chart" :isOpen="isOpen" />
            <x-sidebar-item route="configuracion" label="Configuración" icon="settings" :isOpen="isOpen" />
            <x-sidebar-item route="ayuda" label="Ayuda" icon="help-circle" :isOpen="isOpen" />
        </ul>
    </nav>

    <!-- Footer -->
    <div class="p-4 text-center">
        <template x-if="isOpen">
            <p class="text-sm text-gray-500">© 2024 Gestialix</p>
        </template>
        <template x-if="!isOpen">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
        </template>
    </div>
</div>