<?php
// app/Http/Controllers/EstudianteController.php
namespace App\Http\Controllers;

use App\Models\Asistencia as Attendance;
use App\Models\Estudiante as Student;
use App\Models\Clase as AppClass;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EstudianteController extends Controller
{
    // Listar todos los estudiantes
    public function index()
    {
        $estudiantes = Student::with('class')->get();

        return Inertia::render('Estudiantes/Index', [
            'estudiantes' => $estudiantes
        ]);
    }

    // Crear un nuevo estudiante
    public function create()
    {
        $clases = AppClass::all();
        return Inertia::render('Estudiantes/Create', [
            'clases' => $clases
        ]);
    }

    public function store(Request $request)
    {
        try {
            // Validar los datos del request
            $validatedData = $request->validate([
                'nombre' => 'required|string|max:255', // El nombre del estudiante
                'apellidos' => 'required|string|max:255', // Los apellidos del estudiante
                'clase_id' => 'required|exists:app_classes,id', // Validar que el ID de la clase exista
                'pago' => 'nullable|string|max:255', // Campo pago, puede ser \"Beca\" u otro valor
                'intolerancia_religion' => 'nullable|array', // Intolerancias religiosas
                'intolerancia_religion.*' => 'string|max:255',
                'intolerancia_especifica' => 'nullable|string|max:255', // Intolerancia específica en texto libre
                'beca' => 'boolean', // Indica si tiene beca
            ]);

            // Convertir intolerancia_religion a JSON si existe
            if (isset($validatedData['intolerancia_religion'])) {
                $validatedData['intolerancia_religion'] = json_encode($validatedData['intolerancia_religion']);
            }

            // Crear el estudiante
            $student = Student::create([
                'name' => $validatedData['nombre'], // Mapeo al campo 'name'
                'surname' => $validatedData['apellidos'], // Mapeo al campo 'surname'
                'class_id' => $validatedData['clase_id'], // Mapeo al campo 'class_id'
                'payment' => $validatedData['pago'] ?? null, // Mapeo al campo 'payment'
                'intolerance_religion' => $validatedData['intolerancia_religion'] ?? null, // Mapeo al campo 'intolerance_religion'
                'intolerance_specific' => $validatedData['intolerancia_especifica'] ?? null, // Mapeo al campo 'intolerance_specific'
                'scholarship' => $validatedData['beca'] ?? false, // Mapeo al campo 'scholarship'
            ]);

            // Retornar la respuesta exitosa
            return response()->json([
                'message' => 'Estudiante creado correctamente.',
                'student' => $student,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Retornar errores de validación
            return response()->json([
                'message' => 'Error en la validación de los datos.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Retornar errores generales
            return response()->json([
                'message' => 'Error al crear el estudiante.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Mostrar un estudiante específico
    public function show($id)
    {
        $estudiante = Student::with('class')->findOrFail($id);

        return Inertia::render('Estudiantes/Show', [
            'estudiante' => $estudiante
        ]);
    }

    // Editar un estudiante específico
    public function edit($id)
    {
        $estudiante = Student::findOrFail($id);
        $clases = AppClass::all();

        return Inertia::render('Estudiantes/Edit', [
            'estudiante' => $estudiante,
            'clases' => $clases
        ]);
    }

    // Actualizar un estudiante específico
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'intolerancia_religion' => 'nullable|array',
            'intolerancia_religion.*' => 'string|max:255',
            'beca' => 'boolean',
        ]);

        // Convertimos intolerancia_religion a JSON
        $validatedData['intolerancia_religion'] = json_encode($validatedData['intolerancia_religion']);

        $student = Student::findOrFail($id);
        $student->update($validatedData);

        // Decodificamos antes de enviar al frontend
        $student->intolerancia_religion = json_decode($student->intolerancia_religion);

        return response()->json($student, 200);
    }



    public function actualizaClase(Request $request, $id)
    {
        try {
            $clase = AppClass::findOrFail($id);
            $clase->update($request->all());
            return response()->json(['message' => 'Clase actualizada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    // Eliminar un estudiante específico
    public function destroy($classId, $studentId)
    {
        Log::info("Intentando eliminar el estudiante con ID $studentId de la clase $classId");

        $estudiante = Student::where('id', $studentId)
            ->where('class_id', $classId)
            ->firstOrFail();

        Log::info("Estudiante encontrado: $estudiante->name ($estudiante->id)");

        $estudiante->delete();

        Log::info("Estudiante eliminado correctamente");

        return response()->json(['message' => 'Estudiante eliminado correctamente']);
    }

    // public function toggleAssignment(Estudiante $student)
    // {
    //     $student->asignado_comedor = !$student->asignado_comedor;

    //     if ($student->asignado_comedor) {
    //         $student->asignado_at = now(); // Asigna la fecha actual
    //     } else {
    //         $student->asignado_at = null; // Borra la fecha si se desasigna
    //     }

    //     $student->save();

    //     return response()->json($student); // Devuelve el estudiante actualizado
    // }
    public function toggleAssignment(Student $student, Request $request)
    {
        $forzar = $request->input('forzar', false);

        // Verificar registros ocasionales
        $registrosOcasionales = DB::table('app_occasionals')
            ->where('student_id', $student->id)
            ->whereDate('date', now()->toDateString())
            ->exists();

        if ($registrosOcasionales && !$student->assigned_lunch && !$forzar) {
            return response()->json([
                'warning' => 'Este estudiante tiene registros ocasionales. ¿Deseas continuar?',
            ], 200);
        }

        // Alternar estado
        $student->assigned_lunch = !$student->assigned_lunch;

        if ($student->assigned_lunch) {
            $student->assigned_at = now();
        } else {
            $student->assigned_at = null;
        }

        $student->save();

        return response()->json($student);
    }



    public function updateStudent(Request $request, $id)
    {
        $estudiante = Student::findOrFail($id);

        // Actualiza los datos del estudiante
        $estudiante->asignado_comedor = $request->input('asignado_comedor');
        $estudiante->save();

        // Si ya no está asignado al comedor, elimina sus asistencias
        if (!$estudiante->asignado_comedor) {
            Attendance::where('student_id', $id)->delete();
        }

        return response()->json(['message' => 'Estudiante actualizado']);
    }
}
