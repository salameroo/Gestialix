<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Colegio extends Model
{
    protected $table = 'app_schools';
    protected $fillable = ['name', 'CIF', 'address', 'city', 'state', 'country', 'zip'];

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
