<?php

use App\Http\Controllers\MenuController;
use App\Http\Controllers\PostController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



// Route::get('/', function () {
//     return Inertia::render('Test'); // This will get component Test.jsx from the resources/js/Pages/Test.jsx
// });

Route::get('/', function (): mixed {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/inicio', function () {
        return Inertia::render('Inicio');
    })->name('inicio');
    Route::get('/user-profile', function (Request $request) {
        return $request->user();
    })->name('user-profile');
    Route::put('/user-profile', function (Request $request) {
        return $request->user();
    })->name('user-profile');
});



Route::resource('menus', MenuController::class)->middleware('auth');

// Route::get('/login', function () {
//     return Inertia::render('Auth/Login'); // Asegurate de que el componente esté en el lugar correcto
// });

// Route::get('/register', function () {
//     return Inertia::render('Auth/Register'); // Asegurate de que el componente esté en el lugar correcto
// });

Route::get('/terms', function () {
    return Inertia::render('Terminos/Terms'); // Asegurate de que el componente esté en el lugar correcto
});
// Route::post('/login', [PostController::class, 'login']);