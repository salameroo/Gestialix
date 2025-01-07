<?php

namespace App\Http\Controllers;

use App\Exports\AsistenciasExport;
use App\Models\Asistencia;
use App\Models\Estudiante;
use App\Models\Ocasional;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;


class AsistenciaController extends Controller
{
    // Listar todas las asistenciasuse Illuminate\Support\Facades\Cache;

    public function index()
    {
        // Establece un tiempo de vida para el caché (por ejemplo, 10 minutos)
        $cacheTime = 600; // En segundos (10 minutos)

        // Verifica si ya existe el resultado en caché
        $attendances = Cache::remember('attendances', $cacheTime, function () {
            // Si no existe, se obtiene de la base de datos y se almacena en caché
            return Asistencia::with('estudiante')->get();
        });

        return response()->json($attendances);
    }

    // Mostrar una asistencia específica
    public function show($id)
    {
        $attendance = Cache::remember("attendance_{$id}", 600, function () use ($id) {
            return Asistencia::with('estudiante')->find($id);
        });

        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        return response()->json($attendance);
    }

    // Crear una nueva asistencia
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'nullable|exists:app_students,id',
            'ocasional_id' => 'nullable|exists:app_occasionals,id',
            'date' => 'required|date',
            'attends' => 'required|boolean',
            'lonely_day' => 'required|boolean',
        ]);

        if (is_null($validated['student_id']) && is_null($validated['ocasional_id'])) {
            return response()->json(['error' => 'Debe proporcionar un estudiante regular o ocasional.'], 400);
        }

        $attendance = Asistencia::create($validated);

        Cache::forget('attendances'); // Limpiar cache al crear
        return response()->json([
            'message' => 'Attendance registered successfully.',
            'attendance' => $attendance,
        ], 201);
    }


    // Actualizar una asistencia existente
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate(['attends' => 'required|boolean']);

        $attendance = Asistencia::findOrFail($id);
        $attendance->update(['attends' => $validatedData['attends']]);

        Cache::forget("attendance_{$id}");
        Cache::forget('attendances');

        return response()->json(['message' => 'Attendance updated successfully', 'data' => $attendance]);
    }

    // Eliminar una asistencia
    public function destroy($id)
    {
        $attendance = Asistencia::find($id);

        if (!$attendance) {
            return response()->json(['message' => 'Attendance not found'], 404);
        }

        $attendance->delete();

        Cache::forget("attendance_{$id}");
        Cache::forget('attendances');

        return response()->json(['message' => 'Attendance deleted successfully']);
    }



    // Obtener asistencia filtrada
    public function getFilteredAttendance(Request $request)
    {
        $fecha = $request->input('date');
        $claseId = $request->input('class_id');

        if (!$fecha || !$claseId) {
            return response()->json(['error' => 'Fecha y clase son requeridas'], 400);
        }

        $cacheKey = "filtered_attendances_{$fecha}_{$claseId}";
        $attendances = Cache::remember($cacheKey, 600, function () use ($fecha, $claseId) {
            return Asistencia::with('student')
                ->where('date', $fecha)
                ->whereHas('student', function ($query) use ($claseId) {
                    $query->where('class_id', $claseId);
                })
                ->get();
        });

        return response()->json($attendances);
    }


    public function getOrCreateAttendance(Request $request)
    {
        $date = $request->input('date');
        $classId = $request->input('class_id');

        Log::info("getOrCreateAttendance: date={$date}, classId={$classId}");

        if (is_null($date) || is_null($classId)) {
            return response()->json([
                'error' => 'Date and class are required.'
            ], 400);
        }

        $date = Carbon::parse($date)->toDateString();

        // Recuperar estudiantes sin asistencia
        $studentsWithoutAttendance = Estudiante::where('class_id', $classId)
            ->where('assigned_lunch', 1)
            ->whereNotExists(function ($query) use ($date) {
                $query->selectRaw(1)
                    ->from('app_attendances')
                    ->whereColumn('app_attendances.student_id', 'app_students.id')
                    ->where('app_attendances.date', $date);
            })
            ->pluck('id');

        // Recuperar ocasionales sin asistencia
        $occasionalsWithoutAttendance = Ocasional::where('class_id', $classId)
            ->whereNotExists(function ($query) use ($date) {
                $query->selectRaw(1)
                    ->from('app_attendances')
                    ->whereRaw('app_attendances.occasional_id = app_occasionals.id')
                    ->where('app_attendances.date', $date);
            })
            ->pluck('id');

        Log::info("getOrCreateAttendance: studentsWithoutAttendance=", ['students' => $studentsWithoutAttendance]);
        Log::info("getOrCreateAttendance: occasionalsWithoutAttendance=", ['occasionals' => $occasionalsWithoutAttendance]);

        // Crear asistencias para los que no la tienen
        $attendanceData = collect();

        if (!$studentsWithoutAttendance->isEmpty()) {
            $attendanceData = $attendanceData->merge(
                $studentsWithoutAttendance->map(function ($studentId) use ($date) {
                    return [
                        'student_id' => $studentId,
                        'occasional_id' => null,
                        'date' => $date,
                        'attends' => 1,
                        'lonely_day' => 0,
                    ];
                })
            );
        }

        if (!$occasionalsWithoutAttendance->isEmpty()) {
            $attendanceData = $attendanceData->merge(
                $occasionalsWithoutAttendance->map(function ($occasionalId) use ($date) {
                    return [
                        'student_id' => null,
                        'occasional_id' => $occasionalId,
                        'date' => $date,
                        'attends' => 1,
                        'lonely_day' => 1,
                    ];
                })
            );
        }

        Log::info("getOrCreateAttendance: attendanceData=", ['attendanceData' => $attendanceData]);

        // Insertar o actualizar asistencias
        try {
            Asistencia::upsert($attendanceData->toArray(), ['student_id', 'occasional_id', 'date'], ['attends', 'lonely_day']);
        } catch (Exception $e) {
            Log::error("getOrCreateAttendance: error creating attendances", ['error' => $e->getMessage()]);
            return response()->json(['error' => $e->getMessage()], 500);
        }

        // Recuperar todas las asistencias de esa fecha para la clase
        $attendances = Asistencia::with(['estudiante', 'app_occasionals.student'])
            ->where('date', $date)
            ->where(function ($query) use ($studentsWithoutAttendance, $occasionalsWithoutAttendance) {
                $query->whereIn('student_id', $studentsWithoutAttendance)
                    ->orWhereIn('occasional_id', $occasionalsWithoutAttendance);
            })
            ->orWhere(function ($query) use ($date, $classId) {
                $query->whereHas('estudiante', function ($subQuery) use ($classId) {
                    $subQuery->where('class_id', $classId);
                })->where('date', $date);
            })
            ->get();

        Log::info("getOrCreateAttendance: attendances=", ['attendances' => $attendances]);

        return response()->json($attendances);
    }



    // Calcular asistencias por día
    public function calculateAttendancesByDay($mes, $anio)
    {
        $cacheKey = "attendances_month_{$mes}_year_{$anio}";
        $attendances = Cache::remember($cacheKey, 600, function () use ($mes, $anio) {
            return DB::table('app_attendances')
                ->join('app_students', 'app_attendances.student_id', '=', 'app_students.id')
                ->join('app_classes', 'app_students.class_id', '=', 'app_classes.id')
                ->select(
                    DB::raw('DATE(app_attendances.date) as day'),
                    DB::raw("COUNT(CASE WHEN app_classes.name LIKE 'I%' THEN 1 ELSE NULL END) as infant"),
                    DB::raw("COUNT(CASE WHEN app_classes.name LIKE 'P%' THEN 1 ELSE NULL END) as `primary`")
                )
                ->whereYear('app_attendances.date', $anio)
                ->whereMonth('app_attendances.date', $mes)
                ->groupBy('day')
                ->orderBy('day')
                ->get();
        });

        return response()->json($attendances->map(function ($a) {
            return [
                'dia' => $a->day,
                'infantil' => $a->infant,
                'primaria' => $a->primary,
                'total' => $a->infant + $a->primary,
            ];
        }));
    }


    // Exportar asistencias a Excel
    public function exportExcel()
    {
        return Excel::download(new AsistenciasExport, 'cafeteria_vouchers_report.xlsx');
    }
}
