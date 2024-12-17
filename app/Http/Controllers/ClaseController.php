<?php

namespace App\Http\Controllers;

use App\Models\Clase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ClaseController extends Controller
{
    public function index()
    {
        return Clase::with('estudiantes')->get();
    }

    public function obtenerClases()
    {
        $clases = DB::table('clases')->select('id', 'nombre')->get();
        return response()->json($clases);
    }

    public function obtenerAlumnos(Request $request)
    {
        $claseId = $request->query('clase_id');
        $mes = $request->query('mes');
        $anio = date('Y'); // Año actual

        // Validar parámetros
        if (!$claseId || !$mes) {
            return response()->json(['error' => 'Parámetros inválidos'], 400);
        }

        // Obtener estudiantes de la clase
        $alumnos = DB::table('estudiantes')
            ->where('clase_id', $claseId)
            ->select('id', 'nombre', 'apellidos')
            ->get();

        $diasEnMes = cal_days_in_month(CAL_GREGORIAN, $mes, $anio);

        if ($alumnos->isEmpty()) {
            return response()->json(['message' => 'No hay estudiantes para esta clase'], 200);
        }

        // Obtener asistencias
        $asistencias = DB::table('asistencias')
            ->whereIn('estudiante_id', $alumnos->pluck('id'))
            ->whereYear('fecha', $anio)
            ->whereMonth('fecha', $mes)
            ->get();

        // Mapear estudiantes con interrogantes por defecto si no hay asistencias
        $alumnos = $alumnos->map(function ($alumno) use ($asistencias, $diasEnMes, $anio, $mes) {
            $alumno->diasComedor = [];
            for ($dia = 1; $dia <= $diasEnMes; $dia++) {
                $fecha = sprintf('%04d-%02d-%02d', $anio, $mes, $dia);
                $asistencia = $asistencias->first(function ($a) use ($alumno, $fecha) {
                    return $a->estudiante_id == $alumno->id && $a->fecha == $fecha;
                });
                $alumno->diasComedor[] = $asistencia ? (bool)$asistencia->asiste : null; // null = ?
            }
            return $alumno;
        });

        return response()->json($alumnos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'curso_academico' => 'required|regex:/^\d{4}\/\d{4}$/',
        ]);

        $class = Clase::create($validatedData);

        // Asegurar que 'estudiantes' esté inicializado como un array vacío
        $class->estudiantes = [];
        return response()->json($class, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'curso_academico' => 'required|regex:/^\d{4}\/\d{4}$/',
        ]);

        $class = Clase::findOrFail($id);
        $class->update($validatedData);

        // Cargar estudiantes y devolver en la respuesta
        $class->load('estudiantes');
        return response()->json($class);
    }




    public function edit($id)
    {
        // Find the class by ID
        $clase = Clase::findOrFail($id);

        // Render the edit form
        return Inertia::render('Clases/Edit', [
            'clase' => $clase
        ]);
    }



    // Eliminar una clase específica
    public function destroy($id)
    {
        // Buscar la clase por ID o lanzar un error 404 si no existe
        $clase = Clase::findOrFail($id);

        // Borrar manualmente los estudiantes asociados antes de borrar la clase
        $clase->estudiantes()->delete();

        // Borrar la clase
        $clase->delete();

        // Redireccionar a la página de índice de clases con un mensaje de éxito
        return Inertia::render(
            'ClasesManagement/Index',
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
}
