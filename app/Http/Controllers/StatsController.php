<?php

namespace App\Http\Controllers;

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

    public function getStudentsSummary()
    {
        $registrations = Estudiante::selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return response()->json($registrations);
    }
}
