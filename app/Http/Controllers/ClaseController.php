<?php

namespace App\Http\Controllers;

use App\Models\Clase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ClaseController extends Controller
{

    private function getClassesBySchool()
    {
        $user = auth()->user();

        // Verificar que el usuario tenga un `school_id` asociado
        if (!$user || !$user->school_id) {
            abort(403, 'No tienes un colegio asignado. Por favor, contacta al administrador.');
        }

        // Retornar solo las clases del colegio del usuario
        return Clase::where('school_id', $user->school_id);
    }


    public function index()
    {
        $clases = $this->getClassesBySchool()->with('estudiantes')->get();

        return response()->json($clases);
    }


    public function obtenerClases()
    {
        $start = microtime(true);

        // Recuperar de la caché o regenerarla solo para las clases del colegio del usuario
        $user = auth()->user();
        if (!$user || !$user->school_id) {
            Log::warning('ClaseController.obtenerClases: No school_id found for user');
            return response()->json([
                'message' => 'No tienes un colegio asignado. Por favor, contacta al administrador.'
            ], 403);
        }

        $cacheKey = "class_list_school_{$user->school_id}";

        $clases = Cache::remember($cacheKey, 3600, function () use ($user) {
            return DB::table('app_classes')
                ->where('school_id', $user->school_id)
                ->select('id', 'name')
                ->get();
        });

        $time = microtime(true) - $start;
        Log::info("Total controller time: {$time} seconds");

        return response()->json($clases);
    }


    public function obtenerAlumnos(Request $request)
    {
        $classId = $request->query('class_id');
        $month = $request->query('month');
        $year = $request->query('year') ?? date('Y'); // Año actual por defecto si no se proporciona

        Log::info('ClaseController.obtenerAlumnos: Request data', [
            'class_id' => $classId,
            'month' => $month,
            'year' => $year,
        ]);

        // Validar parámetros
        if (!$classId || !$month) {
            Log::warning('ClaseController.obtenerAlumnos: Invalid parameters');
            return response()->json(['error' => 'Invalid parameters'], 400);
        }

        // Generar una clave de caché única
        $cacheKey = "students_class_{$classId}_{$year}_{$month}";

        Log::info("ClaseController.obtenerAlumnos: Using cache key {$cacheKey}");

        try {
            // Verificar si la caché está habilitada y si existe la clave
            if (!Cache::has($cacheKey)) {
                Log::info('ClaseController.obtenerAlumnos: Cache not found, generating data');
            }

            $students = Cache::remember($cacheKey, 3600, function () use ($classId, $month, $year) {
                return $this->generateStudentData($classId, $month, $year);
            });
        } catch (\Exception $e) {
            Log::error('ClaseController.obtenerAlumnos: Cache error, falling back to direct query', [
                'error' => $e->getMessage(),
            ]);

            // Si la caché no está disponible, se realiza la consulta directamente
            $students = $this->generateStudentData($classId, $month, $year);
        }

        Log::info('ClaseController.obtenerAlumnos: Ending');
        return response()->json($students);
    }

    private function generateStudentData($classId, $month, $year)
    {
        Log::info('ClaseController.generateStudentData: Generating data for class', [
            'class_id' => $classId,
            'month' => $month,
            'year' => $year,
        ]);

        $students = DB::table('app_students')
            ->where('class_id', $classId)
            ->select('id', 'name', 'surname')
            ->get();

        $daysInMonth = cal_days_in_month(CAL_GREGORIAN, $month, $year);

        if ($students->isEmpty()) {
            Log::warning('ClaseController.generateStudentData: No students found');
            return [];
        }

        $attendances = DB::table('app_attendances')
            ->whereIn('student_id', $students->pluck('id'))
            ->whereYear('date', $year)
            ->whereMonth('date', $month)
            ->get();

        $occasionals = DB::table('app_occasionals')
            ->where('class_id', $classId)
            ->whereYear('date', $year)
            ->whereMonth('date', $month)
            ->select('id', 'date', 'student_id')
            ->get();

        return $students->map(function ($student) use ($attendances, $occasionals, $daysInMonth, $year, $month) {
            $student->mealDays = [];
            for ($day = 1; $day <= $daysInMonth; $day++) {
                $date = sprintf('%04d-%02d-%02d', $year, $month, $day);

                $attendance = $attendances->first(function ($a) use ($student, $date) {
                    return $a->student_id == $student->id && $a->date == $date;
                });

                $occasional = $occasionals->first(function ($o) use ($student, $date) {
                    return $o->student_id == $student->id && $o->date == $date;
                });

                if ($occasional) {
                    $student->mealDays[] = 'O';
                } elseif ($attendance) {
                    $student->mealDays[] = (bool)$attendance->attends ? '✓' : '✗';
                } else {
                    $student->mealDays[] = '-';
                }
            }
            return $student;
        });
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        // $request->merge([
        //     'name' => $request->input('nombre'),
        //     'academic_year' => $request->input('curso_academico'),
        // ]);

        Log::info('ClaseController.store: Request data', $request->all());

        Log::info('ClaseController.store: Starting');

        // Obtener el usuario autenticado
        $user = auth()->user();

        Log::info('ClaseController.store: User', [
            'user_id' => $user ? $user->id : null,
            'school_id' => $user ? $user->school_id : null,
        ]);

        // Verificar si el usuario tiene un `school_id` asociado
        if (!$user || !$user->school_id) {
            Log::warning('ClaseController.store: No school_id found for user');
            return response()->json([
                'message' => 'No tienes un colegio asignado. Por favor, ponte en contacto con el administrador.'
            ], 403);
        }

        // Validar los datos de la solicitud
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'academic_year' => 'required|string|max:255',
        ]);

        Log::info('ClaseController.store: Validated data', $validatedData);

        // Asignar automáticamente el `school_id` del usuario autenticado
        $validatedData['school_id'] = $user->school_id;

        try {
            $class = Clase::create($validatedData);
            Log::info('ClaseController.store: Class created', [
                'class_id' => $class->id,
            ]);
        } catch (\Exception $e) {
            Log::error('ClaseController.store: Error creating class', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'message' => 'Ocurrió un error al crear la clase. Por favor, inténtalo de nuevo más tarde.'
            ], 500);
        }

        Log::info('ClaseController.store: Class created', [
            'class_id' => $class->id,
        ]);

        // Invalidar la caché de clases (si es necesario)
        Cache::forget('class_list');

        Log::info('ClaseController.store: Cache cleared');

        // Retornar respuesta exitosa
        return response()->json($class, 201);
    }


    public function update(Request $request, $id)
    {
        // Log para depuración
        Log::info('ClaseController.update: Request data', $request->all());

        // Obtener el usuario autenticado
        $user = auth()->user();

        Log::info('ClaseController.update: User', [
            'user_id' => $user ? $user->id : null,
            'school_id' => $user ? $user->school_id : null,
        ]);

        // Verificar si el usuario tiene un `school_id` asociado
        if (!$user || !$user->school_id) {
            Log::warning('ClaseController.update: No school_id found for user');
            return response()->json([
                'message' => 'No tienes un colegio asignado. Por favor, ponte en contacto con el administrador.'
            ], 403);
        }

        // Validar los datos de la solicitud
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'academic_year' => 'required|string|max:255',
        ]);

        // Asignar automáticamente el `school_id` del usuario autenticado
        $validatedData['school_id'] = $user->school_id;

        try {
            // Buscar y actualizar la clase
            $class = Clase::findOrFail($id);

            // Validar que el `school_id` coincide con el del usuario
            if ($class->school_id !== $user->school_id) {
                Log::warning('ClaseController.update: Mismatched school_id', [
                    'class_school_id' => $class->school_id,
                    'user_school_id' => $user->school_id,
                ]);
                return response()->json([
                    'message' => 'No tienes permisos para editar esta clase.'
                ], 403);
            }

            $class->update($validatedData);

            Log::info('ClaseController.update: Class updated', [
                'class_id' => $class->id,
            ]);

            // Invalidar la caché de clases
            Cache::forget('class_list');

            // También invalidar cualquier caché relacionada con los alumnos
            Cache::tags("alumnos_clase_{$id}")->flush();

            return response()->json($class);
        } catch (\Exception $e) {
            Log::error('ClaseController.update: Error updating class', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'message' => 'Ocurrió un error al actualizar la clase. Por favor, inténtalo de nuevo más tarde.'
            ], 500);
        }
    }

    // public function update(Request $request, $id)
    // {
    //     $validatedData = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'academic_year' => 'required|string|max:255',
    //         'school_id' => 'required|exists:app_schools,id',
    //     ]);

    //     $class = Clase::findOrFail($id);
    //     $class->update($validatedData);

    //     // Invalidar la caché de clases
    //     Cache::forget('class_list');

    //     // También invalidar cualquier caché relacionada con los alumnos
    //     Cache::tags("alumnos_clase_{$id}")->flush();

    //     return response()->json($class);
    // }




    public function edit($id)
    {
        // Buscar la clase dentro del colegio del usuario
        $clase = $this->getClassesBySchool()->findOrFail($id);

        // Renderizar el formulario de edición
        return Inertia::render('Classes/Edit', [
            'class' => $clase,
        ]);
    }


    // Eliminar una clase específica
    public function destroy($id)
    {
        // Buscar la clase dentro del colegio del usuario
        $clase = $this->getClassesBySchool()->findOrFail($id);

        // Eliminar los estudiantes asociados y la clase
        $clase->estudiantes()->delete();
        $clase->delete();

        // Invalidar la caché de clases
        Cache::forget('class_list');

        // También invalidar cualquier caché relacionada con los alumnos
        Cache::tags("alumnos_clase_{$id}")->flush();

        return response()->json(['message' => 'Clase eliminada con éxito'], 200);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
}
