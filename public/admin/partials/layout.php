<?php
function renderLayout($slot)
{
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mi Sitio</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.2/dist/tailwind.min.css" rel="stylesheet">
    </head>

    <body>
        <?php include 'navbar.php'; ?>
        <main class="p-4">
            <?= $slot; // Renderiza el contenido dinámico 
            ?>
        </main>
    </body>

    </html>
<?php
}
?>