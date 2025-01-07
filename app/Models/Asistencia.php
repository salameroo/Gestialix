<?php

// app/Models/Asistencia.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    protected $table = 'app_attendances';
    protected $fillable = [
        'student_id',
        'occasional_id',
        'date',
        'attends',
        'lonely_day',
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'student_id');
    }

    public function ocasional()
    {
        return $this->belongsTo(Ocasional::class, 'occasional_id');
    }
    public function app_occasionals()
    {
        return $this->belongsTo(Ocasional::class, 'occasional_id');
    }
}
