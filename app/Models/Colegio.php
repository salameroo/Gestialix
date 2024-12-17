<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Colegio extends Model
{
    protected $fillable = ['nombre', 'direccion'];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function estudiantes()
    {
        return $this->hasMany(Estudiante::class);
    }

    public function clases()
    {
        return $this->hasMany(Clase::class);
    }
}
