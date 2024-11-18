<?php
// app/Http/Controllers/AsistenciaController.php
namespace App\Http\Controllers;

use App\Models\Asistencia;
use App\Models\Estudiante;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AsistenciaController extends Controller
{
    // Listar todas las asistencias
    public function index()
    {
        $asistencias = Asistencia::with('estudiante')->get();

        return Inertia::render('Asistencias/Index', [
            'asistencias' => $asistencias
        ]);
    }

    // Crear una nueva asistencia
    public function create()
    {
        $estudiantes = Estudiante::all();
        return Inertia::render('Asistencias/Create', [
            'estudiantes' => $estudiantes
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'estudiante_id' => 'required|exists:estudiantes,id',
            'fecha' => 'required|date',
            'asiste' => 'boolean',
            'es_dia_suelto' => 'boolean'
        ]);

        Asistencia::create($request->all());

        return redirect()->route('asistencias.index')->with('success', 'Asistencia registrada.');
    }

    // Editar una asistencia específica
    public function edit($id)
    {
        $asistencia = Asistencia::findOrFail($id);
        $estudiantes = Estudiante::all();

        return Inertia::render('Asistencias/Edit', [
            'asistencia' => $asistencia,
            'estudiantes' => $estudiantes
        ]);
    }

    // Actualizar una asistencia específica
    public function update(Request $request, $id)
    {
        $request->validate([
            'estudiante_id' => 'required|exists:estudiantes,id',
            'fecha' => 'required|date',
            'asiste' => 'boolean',
            'es_dia_suelto' => 'boolean'
        ]);

        $asistencia = Asistencia::findOrFail($id);
        $asistencia->update($request->all());

        return redirect()->route('asistencias.index')->with('success', 'Asistencia actualizada.');
    }

    // Eliminar una asistencia específica
    public function destroy($id)
    {
        $asistencia = Asistencia::findOrFail($id);
        $asistencia->delete();

        return redirect()->route('asistencias.index')->with('success', 'Asistencia eliminada.');
    }
}
