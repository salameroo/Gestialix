<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    public function inicio()
    {
        return Inertia::render('Inicio');
    }

    public function clases()
    {
        return Inertia::render('ClasesManagement/Clases');
    }

    public function asistencias()
    {
        return Inertia::render('AsistenciasManagement/AttendanceCrud');
    }

    public function index()
    {
        return Inertia::render('Index');
    }

    public function settings()
    {
        return Inertia::render('Settings/Ajustes');
    }
}
