<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ocasional extends Model
{
    use HasFactory;

    protected $table = 'app_occasionals';
    protected $fillable = [
        'student_id',
        'class_id',
        'date',
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'student_id');
    }

    public function clase()
    {
        return $this->belongsTo(Clase::class);
    }
}
