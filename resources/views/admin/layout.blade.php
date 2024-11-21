<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    @vite('resources/css/app.css')
</head>

<body class="bg-gray-100">
    <div class="min-h-screen flex flex-col">
        @include('admin.partials.navbar')
        <main class="flex-grow">
            @yield('content')
        </main>
    </div>
</body>

</html>