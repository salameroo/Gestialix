<?php

use App\Models\User;
use App\Http\Controllers\ClaseController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\AsistenciaController;
use App\Http\Controllers\MenuController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\DashboardController;



// Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
//     Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
//     Route::resource('users', UserController::class); // CRUD de usuarios
// });

// Route::middleware(['auth', 'role:admin'])->group(function () {
//     Route::prefix('admin')->group(function () {
//         Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');
//         Route::resource('users', UserController::class);
//         Route::resource('roles', RoleController::class);
//     });
// });


// Route::domain('admin.gestialix.com')->middleware(['auth', 'role:admin'])->group(function () {
//     Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');
// });




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
    Route::get('/inicio', function () {
        return Inertia::render('Inicio');
    })->name('inicio');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/clases', function () {
        return Inertia::render('ClasesManagement/Clases');
    })->name('clases');

    Route::get('/asistencias', function () {
        return Inertia::render('AsistenciasManagement/AttendanceCrud');
    })->name('asistencias');

    Route::get('/index', function () {
        return Inertia::render('Index');
    })->name('index');

    Route::get('/user-profile', function (Request $request) {
        return $request->user();
    })->name('user-profile');

    Route::put('/user-profile', function (Request $request) {
        return $request->user();
    })->name('user-profile');

    Route::get('/user/two-factor-authentication', function () {
        return Inertia::render('TwoFactorAuthentication', [
            'user' => auth()->user(),
        ]);
    })->middleware(['auth']);
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
})->name('terms');
// Route::post('/login', [PostController::class, 'login']);
