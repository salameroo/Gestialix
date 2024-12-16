<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class DefaultController extends Controller
{
    public function index()
    {
        echo "La aplicación está cargando correctamente.";
        // return Inertia::render('Landing');
    }

    public function handle($action)
    {
        // Aquí defines las acciones permitidas
        $allowedActions = [
            'pedos' => function () {
                return response('+k2');
            },
            'profile-edit' => function () {
                // Ejemplo de acción para editar perfil
                return view('profile.edit');
            },
            // Agrega más acciones según sea necesario
        ];

        if (array_key_exists($action, $allowedActions)) {
            return $allowedActions[$action]();
        }

        // Retornar un error si la acción no es válida
        return abort(404, 'Action not found.');
    }
}
