<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Log;

class VinController extends Controller
{

    public function decode(Request $request)
    {
        Log::info("Iniciando decodificación para VIN: " . $request->vin);

        $vin = $request->input('vin');

        $response = Http::get("https://api.apiverve.com/v1/vindecoder?VIN=$vin");
        Log::info("Respuesta de la API: " . $response->body());

        if ($response->successful()) {
            $data = $response->json();
            Log::info("Datos obtenidos: ", $data);

            $vehicle = Vehicle::updateOrCreate(
                ['vin' => $vin],
                [
                    'make' => $data['make'] ?? null,
                    'model' => $data['model'] ?? null,
                    'year' => $data['year'] ?? null,
                    'engine' => $data['engine'] ?? null,
                    'country' => $data['country'] ?? null,
                ]
            );

            Log::info("Vehículo guardado: " . $vehicle->id);
            return back()->with('success', 'Vehículo decodificado y guardado correctamente.');
        }

        Log::error("Error al decodificar VIN: " . $response->status());
        return back()->withErrors(['vin' => 'No se pudo decodificar el VIN.']);
    }

    // public function decode(Request $request)
    // {
    //     $vin = $request->input('vin');

    //     // Verifica el formato del VIN
    //     if (strlen($vin) !== 17) {
    //         return back()->withErrors(['vin' => 'El VIN debe tener 17 caracteres.']);
    //     }

    //     // Consulta a Free VIN Decoder
    //     $response = Http::get("https://www.freevindecoder.eu/api/vin/$vin");

    //     if ($response->successful()) {
    //         $data = $response->json();

    //         // Guarda los datos en la base de datos
    //         $vehicle = Vehicle::updateOrCreate(
    //             ['vin' => $vin],
    //             [
    //                 'make' => $data['make'] ?? null,
    //                 'model' => $data['model'] ?? null,
    //                 'year' => $data['year'] ?? null,
    //                 'engine' => $data['engine'] ?? null,
    //                 'country' => $data['country'] ?? null,
    //             ]
    //         );

    //         return back()->with('success', 'Vehículo decodificado y guardado correctamente.');
    //     }

    //     return back()->withErrors(['vin' => 'No se pudo decodificar el VIN.']);
    // }
}
