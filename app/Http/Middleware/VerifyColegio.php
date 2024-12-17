<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyColegio
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        $userColegioId = auth()->user()->colegio_id;
        $routeColegioId = $request->route('colegio_id');

        if ($userColegioId != $routeColegioId) {
            abort(403, 'Acceso no autorizado.');
        }

        return $next($request);
    }
}
