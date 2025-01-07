<?php

namespace App\Http\Controllers;

use App\Models\Monitora;
use Illuminate\Http\Request;

class MonitoraController extends Controller
{
    public function index()
    {
        return Monitora::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'email' => 'required|email|unique:monitoras,email',
            'telefono' => 'required|string|max:20',
            'clase_id' => 'nullable|exists:clases,id',
        ]);

        $monitora = Monitora::create($validated);
        return response()->json($monitora, 201);
    }

    public function show($id)
    {
        return Monitora::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'email' => 'required|email|unique:monitoras,email,' . $id,
            'telefono' => 'required|string|max:20',
            'clase_id' => 'nullable|exists:clases,id',
        ]);

        $monitora = Monitora::findOrFail($id);
        $monitora->update($validated);
        return response()->json($monitora);
    }

    public function destroy($id)
    {
        $monitora = Monitora::findOrFail($id);
        $monitora->delete();
        return response()->noContent();
    }
}
// routes/api.php
