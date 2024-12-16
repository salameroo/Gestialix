<?php

// app/Models/Asistencia.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    protected $fillable = [
        'estudiante_id',
        'ocasional_id',
        'fecha',
        'asiste',
        'es_dia_suelto',
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'estudiante_id');
    }

    public function ocasional()
    {
        return $this->belongsTo(Ocasional::class, 'ocasional_id');
    }
}
