<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use Illuminate\Http\Request;

class GeneralController extends Controller
{
    public function index()
    {
        $colegioId = auth()->user()->colegio_id;

        $alumnos = Estudiante::where('colegio_id', $colegioId)->get();

        return view('alumnos.index', compact('alumnos'));
    }
}
