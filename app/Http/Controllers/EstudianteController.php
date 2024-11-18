<?php
// app/Http/Controllers/EstudianteController.php
namespace App\Http\Controllers;

use App\Models\Estudiante;
use App\Models\Clase;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EstudianteController extends Controller
{
    // Listar todos los estudiantes
    public function index()
    {
        $estudiantes = Estudiante::with('clase')->get();

        return Inertia::render('Estudiantes/Index', [
            'estudiantes' => $estudiantes
        ]);
    }

    // Crear un nuevo estudiante
    public function create()
    {
        $clases = Clase::all();
        return Inertia::render('Estudiantes/Create', [
            'clases' => $clases
        ]);
    }

    public function store(Request $request, Clase $class)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'intolerancia_religion' => 'nullable|string|max:255',
            'beca' => 'boolean'
        ]);

        $estudiante = $class->estudiantes()->create($validatedData);

        return response()->json($estudiante, 201);
    }

    // Mostrar un estudiante específico
    public function show($id)
    {
        $estudiante = Estudiante::with('clase')->findOrFail($id);

        return Inertia::render('Estudiantes/Show', [
            'estudiante' => $estudiante
        ]);
    }

    // Editar un estudiante específico
    public function edit($id)
    {
        $estudiante = Estudiante::findOrFail($id);
        $clases = Clase::all();

        return Inertia::render('Estudiantes/Edit', [
            'estudiante' => $estudiante,
            'clases' => $clases
        ]);
    }

    // Actualizar un estudiante específico
    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'clase_id' => 'required|exists:clases,id',
            'pago' => 'boolean',
            'intolerancia_religion' => 'nullable|string|max:255',
            'beca' => 'boolean'
        ]);

        $estudiante = Estudiante::findOrFail($id);
        $estudiante->update($request->all());

        return redirect()->route('estudiantes.index')->with('success', 'Estudiante actualizado.');
    }

    // Eliminar un estudiante específico
    public function destroy($id)
    {
        $estudiante = Estudiante::findOrFail($id);
        $estudiante->delete();

        return response()->json($estudiante, 201);
    }
}
