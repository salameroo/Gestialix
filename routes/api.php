
<?php

use App\Http\Controllers\ClaseController;
use App\Http\Controllers\crud;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\AsistenciaController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\StatsController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




Route::get('/attendance', [AsistenciaController::class, 'obtenerAsistenciaFiltrada']);
Route::get('/attendance/{id}', [AsistenciaController::class, 'show']);
Route::post('/attendance', [AsistenciaController::class, 'store']);
// Route::put('/attendance/{id}', [AsistenciaController::class, 'update']);
Route::delete('/attendance/{id}', [AsistenciaController::class, 'destroy']);
// Route::put('/attendance/{student}', [AsistenciaController::class, 'update'])->name('attendance.update');
Route::patch('/attendance/{id}', [AsistenciaController::class, 'update']);

Route::get('/attendance-or-create', [AsistenciaController::class, 'getOrCreateAttendance']);
Route::get('/students', [EstudianteController::class, 'index']);



Route::get('/stats/asistencias', [StatsController::class, 'getAttendanceSummary']);

// AAAAA

Route::get('/stats/altasEstudiantes', [StatsController::class, 'getStudentsSummary']);

// Route::middleware('auth:sanctum')->post('/classes', [ClaseController::class, 'store']);
// routes/web.php
// routes/web.php

Route::patch('/students/{student}/toggle-assignment', [EstudianteController::class, 'toggleAssignment']);

Route::get('/data', [crud::class, 'index']);

Route::post('/estudiantes', [EstudianteController::class, 'store'])->name('estudiantes.store');
Route::post('/classes/{class}/students', [EstudianteController::class, 'store']);
Route::put('/students/{id}', [EstudianteController::class, 'update']);
Route::delete('/classes/{class}/students/{student}', [EstudianteController::class, 'destroy']);

Route::get('/classes', [ClaseController::class, 'index'])->name('clases.index');
Route::post('/classes/new', [ClaseController::class, 'store']);
Route::get('/classes/{id}', [ClaseController::class, 'show'])->name('clases.show');
Route::put('/classes/{id}', [ClaseController::class, 'update']);
Route::delete('/classes/{id}', [ClaseController::class, 'destroy'])->name('clases.destroy');
