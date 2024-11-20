<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" href="{{ asset('/images/logo.svg') }}" type="image/svg+xml">
    <title inertia>{{ config('app.name', 'Gestialix') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes

    @viteReactRefresh
    <!-- @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}"]) -->
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])

    @inertiaHead
    <style>
    </style>
</head>

<body class="font-sans antialiased">

    @inertia
</body>

</html>