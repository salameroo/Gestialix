<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use App\Models\Estudiante;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public function getAttendanceSummary()
    {
        // Obtenemos las estadísticas de los últimos 7 días
        $summary = DB::table('asistencias')
            ->select(
                DB::raw('DATE(fecha) as fecha'),
                DB::raw('SUM(asiste = 1) as presentes'),
                DB::raw('SUM(asiste = 0) as ausentes'),
                DB::raw('SUM(asiste IS NULL) as desconocidos')
            )
            ->groupBy('fecha')
            ->orderBy('fecha', 'desc')
            ->limit(7) // Últimos 7 días
            ->get();

        return response()->json($summary);
    }

    public function getAttendanceData(Request $request)
    {
        // Validar entrada
        $request->validate([
            'class_id' => 'nullable|integer|exists:classes,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'time_filter' => 'required|in:week,month',
        ]);

        $classId = $request->input('class_id');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $timeFilter = $request->input('time_filter');

        // Base query
        $query = DB::table('asistencias')
            ->selectRaw("
            DATE_FORMAT(fecha, ?) as period,
            SUM(presentes) as presentes,
            SUM(ausentes) as ausentes,
            SUM(desconocidos) as desconocidos,
            class_id
        ", [$timeFilter === 'week' ? '%x-W%v' : '%Y-%m']) // %x-W%v para semana, %Y-%m para mes
            ->whereBetween('fecha', [$startDate, $endDate]);

        // Filtro por clase
        if ($classId) {
            $query->where('class_id', $classId);
        }

        // Agrupar y ordenar
        $data = $query->groupBy(['period', 'class_id'])
            ->orderBy('period')
            ->get();

        // Estructura la respuesta
        return response()->json($data);
    }


    public function getStudentsSummary()
    {
        $registrations = Estudiante::selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return response()->json($registrations);
    }

    public function filtrar(Request $request)
    {
        $query = Estudiante::query();

        if ($request->filled('fecha_inicio') && $request->filled('fecha_fin')) {
            $query->whereBetween('created_at', [$request->fecha_inicio, $request->fecha_fin]);
        }

        if ($request->filled('atributo') && $request->filled('valor')) {
            $query->where($request->atributo, $request->valor);
        }

        $estudiantes = $query->get();

        return response()->json($estudiantes);
    }

    public function asistencias(Request $request)
    {
        $query = Asistencia::query();

        // Verifica si hay filtros de fechas
        if ($request->filled('fecha_inicio') && $request->filled('fecha_fin')) {
            $query->whereBetween('fecha', [$request->input('fecha_inicio'), $request->input('fecha_fin')]);
        }

        // Obtén los datos de la base de datos
        $asistencias = $query->get();
        dd($asistencias);
        // Formatea los datos para enviarlos al frontend
        $result = $asistencias->map(function ($item) {
            return [
                'fecha' => $item->fecha,
                'presentes' => $item->presentes,
                'ausentes' => $item->ausentes,
                'desconocidos' => $item->desconocidos,
            ];
        });

        return response()->json($asistencias);
    }

    public function altasEstudiantes(Request $request)
    {
        $query = Estudiante::query();

        // Verifica si hay filtros de fechas
        if ($request->filled('fecha_inicio') && $request->filled('fecha_fin')) {
            $query->whereBetween('created_at', [$request->input('fecha_inicio'), $request->input('fecha_fin')]);
        }

        // Agrupa por fecha y cuenta el total de estudiantes registrados por día
        $altas = $query->selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->groupBy('date')
            ->get();

        return response()->json($altas);
    }
}
