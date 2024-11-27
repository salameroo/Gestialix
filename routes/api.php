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

use App\Http\Controllers\crud;
use App\Http\Controllers\StatsController;
use Illuminate\Support\Facades\Auth;


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->get('/user', function (Request $request) {
    $user = Auth::user();
    // dd($user);
    if (!$user) {
        return response()->json([
            'message' => 'User not found',
        ], 404);
    }

    return response()->json([
        'user' => $user->only(['id', 'name', 'email']), // Datos básicos del usuario
        'roles' => $user->getRoleNames(), // Devuelve los nombres de los roles
        'permissions' => $user->getPermissionNames(), // Devuelve los nombres de los permisos
    ]);
});


// Route::middleware([
//     'auth:sanctum',
//     config('jetstream.auth_session'),
//     'verified',
// ])->group(function () {
//     Route::get('/attendance', [AsistenciaController::class, 'obtenerAsistenciaFiltrada']);
//     Route::get('/attendance/{id}', [AsistenciaController::class, 'show']);
//     Route::post('/attendance', [AsistenciaController::class, 'store']);
//     // Route::put('/attendance/{id}', [AsistenciaController::class, 'update']);
//     Route::delete('/attendance/{id}', [AsistenciaController::class, 'destroy']);
//     // Route::put('/attendance/{student}', [AsistenciaController::class, 'update'])->name('attendance.update');
//     Route::patch('/attendance/{id}', [AsistenciaController::class, 'update']);

//     Route::get('/attendance-or-create', [AsistenciaController::class, 'getOrCreateAttendance']);
//     Route::get('/students', [EstudianteController::class, 'index']);

//     Route::get('/stats/asistencias', [StatsController::class, 'getAttendanceData']);
//     Route::post('/estudiantes/filtrar', [EstudianteController::class, 'filtrar']);
//     Route::get('/stats/altasEstudiantes', [StatsController::class, 'getStudentsSummary']);
//     // Route::post('/stats/asistencias', [StatsController::class, 'asistencias']);
//     Route::post('/stats/altasEstudiantes', [StatsController::class, 'altasEstudiantes']);

//     Route::patch('/students/{student}/toggle-assignment', [EstudianteController::class, 'toggleAssignment']);

//     Route::get('/data', [crud::class, 'index']);

//     Route::post('/estudiantes', [EstudianteController::class, 'store'])->name('estudiantes.store');
//     Route::post('/classes/{class}/students', [EstudianteController::class, 'store']);
//     Route::put('/students/{id}', [EstudianteController::class, 'update']);
//     Route::delete('/classes/{class}/students/{student}', [EstudianteController::class, 'destroy']);

//     Route::get('/classes', [ClaseController::class, 'index'])->name('clases.index');
//     Route::post('/classes/new', [ClaseController::class, 'store']);
//     Route::get('/classes/{id}', [ClaseController::class, 'show'])->name('clases.show');
//     Route::put('/classes/{id}', [ClaseController::class, 'update']);
//     Route::delete('/classes/{id}', [ClaseController::class, 'destroy'])->name('clases.destroy');
// });






// // Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
// //     Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
// //     Route::resource('users', UserController::class); // CRUD de usuarios
// // });

// // Route::middleware(['auth', 'role:admin'])->group(function () {
// //     Route::prefix('admin')->group(function () {
// //         Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');
// //         Route::resource('users', UserController::class);
// //         Route::resource('roles', RoleController::class);
// //     });
// // });


// // Route::domain('admin.gestialix.com')->middleware(['auth', 'role:admin'])->group(function () {
// //     Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');
// // });




// // Route::get('/', function () {
// //     return Inertia::render('Test'); // This will get component Test.jsx from the resources/js/Pages/Test.jsx
// // });

// Route::get('/', function (): mixed {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::middleware([
//     'auth:sanctum',
//     config('jetstream.auth_session'),
//     'verified',
// ])->group(function () {
//     Route::get('/inicio', function () {
//         return Inertia::render('Inicio');
//     })->name('inicio');

//     Route::get('/dashboard', function () {
//         return Inertia::render('Dashboard/Index');
//     })->name('dashboard');

//     Route::get('/clases', function () {
//         return Inertia::render('ClasesManagement/Clases');
//     })->name('clases');

//     Route::get('/asistencias', function () {
//         return Inertia::render('AsistenciasManagement/AttendanceCrud');
//     })->name('asistencias');

//     Route::get('/index', function () {
//         return Inertia::render('Index');
//     })->name('index');

//     Route::get('/settings', function () {
//         return Inertia::render('Settings/Ajustes');
//     })->name('index');

//     Route::get('/user-profile', function (Request $request) {
//         return $request->user();
//     })->name('user-profile');

//     Route::put('/user-profile', function (Request $request) {
//         return $request->user();
//     })->name('user-profile');

//     Route::get('/user/two-factor-authentication', function () {
//         return Inertia::render('TwoFactorAuthentication', [
//             'user' => auth()->user(),
//         ]);
//     })->middleware(['auth']);
// });



// Route::resource('menus', MenuController::class)->middleware('auth');

// // Route::get('/login', function () {
// //     return Inertia::render('Auth/Login'); // Asegurate de que el componente esté en el lugar correcto
// // });

// // Route::get('/register', function () {
// //     return Inertia::render('Auth/Register'); // Asegurate de que el componente esté en el lugar correcto
// // });

// Route::get('/terms', function () {
//     return Inertia::render('Terminos/Terms'); // Asegurate de que el componente esté en el lugar correcto
// })->name('terms');
// // Route::post('/login', [PostController::class, 'login']);
