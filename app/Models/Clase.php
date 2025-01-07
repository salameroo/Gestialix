<?php

// app/Models/Clase.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clase extends Model
{
    use HasFactory;
    protected $table = 'app_classes';

    protected $fillable = ['name', 'academic_year', 'school_id', 'created_at', 'updated_at'];

    public function estudiantes()
    {
        return $this->hasMany(Estudiante::class, 'class_id');
    }
}
