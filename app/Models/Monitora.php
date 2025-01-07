<?php

// app/Models/Monitora.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Monitora extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'app_lunchroom_monitor'; // Cambia si usas un prefijo como 'app_monitoras'

    // Campos rellenables
    protected $fillable = ['name', 'email', 'phone'];

    // Relación con clases (opcional)
    public function class()
    {
        return $this->belongsTo(Clase::class); // Cambia a tu modelo de clase
    }

    // Relación con colegios (opcional)
    public function school()
    {
        return $this->belongsTo(Colegio::class); // Cambia a tu modelo de escuela
    }
}
