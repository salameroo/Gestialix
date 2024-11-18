<!-- resources/views/components/sidebar-item.blade.php -->
@props(['route', 'label', 'icon', 'isOpen'])

<li
    @click="isMobile ? isOpen = false : null"
    class="flex items-center p-2 rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-100">
    <x-dynamic-component :component="'icons.' . $icon" class="w-6 h-6" />
    @if($isOpen)
    <span class="ml-4">{{ $label }}</span>
    @endif
</li>