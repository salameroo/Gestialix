<?php

use App\Http\Controllers\AsistenciaController;
use App\Http\Controllers\ClaseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DefaultController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\OcasionalesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\ViewController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\MonitoraController;


// ========================================================
// ================== Rutas de prueba =====================
// ========================================================
Route::get('/exportar-asistencias', [AsistenciaController::class, 'exportarExcel'])->name('asistencias.exportar');
Route::get('/asistencias/{mes}/{anio}', [AsistenciaController::class, 'calcularAsistenciasPorDia']);




Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/terms', function () {
    return Inertia::render('Terminos/Terms');
})->name('terms');

Route::get('/no-autorizado', function () {
    return view('errors.custom-403');
})->name('no-autorizado');

Route::get('/in', [DefaultController::class, 'index']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/profile/school', [ProfileController::class, 'colegio'])->name('profile.school');
});

require __DIR__ . '/auth.php';


Route::middleware(['auth', 'verified'])->group(function () {

    // --------------------------------------------------
    // Inertia Render Routes
    // --------------------------------------------------
    Route::controller(ViewController::class)->group(function () {
        Route::get('/inicio', 'inicio')->name('inicio');
        Route::get('/clases', 'clases')->name('clases');
        Route::get('/asistencias', 'asistencias')->name('asistencias');
        Route::get('/index', 'index')->name('index');
        Route::get('/settings', 'settings')->name('settings');
        Route::get('/info', 'info')->name('info');
        Route::get('/monitoras', 'monitoras')->name('monitoras');
    });

    Route::prefix('api/info')->group(function () {
        Route::get('/clasees', [ClaseController::class, 'obtenerClases']);
        Route::get('/alumnos', [ClaseController::class, 'obtenerAlumnos']);
    });

    // --------------------------------------------------
    // Dashboard Routes
    // --------------------------------------------------
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


    // --------------------------------------------------
    // API Routes
    // --------------------------------------------------
    Route::prefix('api')->group(function () {
        Route::get('/user', function (Request $request) {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            // Cargar el colegio asociado al usuario
            $user->load('school'); // Asegúrate de que la relación esté definida en el modelo User

            return response()->json([
                'user' => $user->only(['id', 'name', 'email', 'school_id']),
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getPermissionNames(),
                'school' => $user->school ? [
                    'name' => $user->school->name,
                    'address' => $user->school->address,
                    'city' => $user->school->city,
                ] : null,
            ]);
        });


        Route::resource('attendance', AsistenciaController::class)->except(['create', 'edit']);
        Route::get('/attendance-or-create', [AsistenciaController::class, 'getOrCreateAttendance']);

        Route::resource('ocasionales', OcasionalesController::class)->except(['create', 'edit']);
        Route::post('/ocasionales/get', [OcasionalesController::class, 'getByDate'])->name('ocasionales.getByDate');

        Route::resource('students', EstudianteController::class)->except(['create', 'edit']);
        Route::patch('/students/{student}/toggle-assignment', [EstudianteController::class, 'toggleAssignment']);
        Route::post('/students/filtrar', [EstudianteController::class, 'filtrar']);

        Route::delete('/classes/{classId}/students/{studentId}', [EstudianteController::class, 'destroy']);
        Route::get('/classes', [ClaseController::class, 'index']);
        Route::get('/classes/{class}', [ClaseController::class, 'show']);
        Route::post('/classes/new', [ClaseController::class, 'store']);
        Route::delete('/classes/{class}', [ClaseController::class, 'destroy']);
        Route::put('/classes/{class}', [ClaseController::class, 'update']);

        Route::get('/stats/asistencias', [StatsController::class, 'getAttendanceData']);
        Route::get('/stats/altasEstudiantes', [StatsController::class, 'getStudentsSummary']);
        Route::post('/stats/altasEstudiantes', [StatsController::class, 'altasEstudiantes']);

        Route::get('/data', [StatsController::class, 'index']);


        Route::prefix('monitoras')->group(function () {
            Route::get('/', [MonitoraController::class, 'index']); // Obtener todas las monitoras
            Route::post('/', [MonitoraController::class, 'store']); // Crear una nueva monitora
            Route::get('/{id}', [MonitoraController::class, 'show']); // Obtener detalles de una monitora específica
            Route::put('/{id}', [MonitoraController::class, 'update']); // Actualizar monitora existente
            Route::delete('/{id}', [MonitoraController::class, 'destroy']); // Eliminar monitora
        });
    });
});


// --------------------------------------------------
// Dynamic Routes Using DefaultController
// --------------------------------------------------
// Route::get('/{action}', [DefaultController::class, 'handle'])->where('action', 'pedos|dashboard|profile-edit|user-profile|inicio|clases|asistencias|index|settings')->name('default.action');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');
