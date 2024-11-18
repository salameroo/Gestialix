<?php

use App\Http\Controllers\ClaseController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\AsistenciaController;
use App\Http\Controllers\MenuController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




// Route::middleware('auth:sanctum')->post('/classes', [ClaseController::class, 'store']);
// routes/web.php
// routes/web.php


Route::post('/estudiantes', [EstudianteController::class, 'store'])->name('estudiantes.store');
Route::post('/classes/{class}/students', [EstudianteController::class, 'store']);
Route::delete('/classes/{class}/students/{student}', [EstudianteController::class, 'destroy']);

Route::get('/classes', [ClaseController::class, 'index'])->name('clases.index');
Route::get('/classes/{id}', [ClaseController::class, 'show'])->name('clases.show');
Route::post('/classes', [ClaseController::class, 'store']);
Route::delete('/classes/{id}', [ClaseController::class, 'destroy'])->name('clases.destroy');
