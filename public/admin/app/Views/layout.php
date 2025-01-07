<!DOCTYPE html>
<html lang="es" class="h-full bg-gray-100">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($title ?? 'Gestialix Admin') ?></title>

    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <meta name="description" content="Panel de administración de Gestialix">
    <meta name="author" content="Gestialix">

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'gestialix': '#3498db',
                    }
                }
            }
        }
    </script>
</head>

<body class="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
    <?php if (isset($_SESSION['admin'])): ?>
        <?php include __DIR__ . '/navbar.php'; ?>
    <?php endif; ?>

    <!-- Main Content -->
    <main class="flex-grow max-w-7xl container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
            <div class="p-6 sm:p-8">
                <h1 class="text-3xl font-bold text-gestialix mb-6"><?= htmlspecialchars($title ?? 'Dashboard') ?></h1>
                <div class="space-y-6">
                    <?= $content ?? '' ?>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <?php if (isset($_SESSION['admin'])): ?>
        <footer class="bg-white shadow-inner mt-8">
            <div class="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <div class="flex flex-col sm:flex-row justify-between items-center">
                    <p class="text-gray-600 text-sm">
                        &copy; <?= date('Y') ?> Gestialix - Todos los derechos reservados.
                    </p>
                    <div class="mt-4 sm:mt-0">
                        <a href="#" class="text-gestialix hover:text-gestialix-dark transition-colors duration-200 mr-4">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="text-gestialix hover:text-gestialix-dark transition-colors duration-200 mr-4">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="text-gestialix hover:text-gestialix-dark transition-colors duration-200">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    <?php endif; ?>

    <script>
        // Add any additional JavaScript here
    </script>
</body>

</html>