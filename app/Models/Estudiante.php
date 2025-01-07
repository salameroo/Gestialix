<?php
// app/Models/Estudiante.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;

    protected $table = 'app_students';
    protected $fillable = ['name', 'surname', 'class_id', 'payment', 'intolerance_religion', 'scholarship', 'assigned_lunch', 'assigned_at'];


    public function clase()
    {
        return $this->belongsTo(Clase::class, 'class_id');
    }
    public function asistencias()
    {
        return $this->hasMany(Asistencia::class);
    }
    public function getAsignadoComedorAttribute($value)
    {
        return (bool) $value; // Convierte 0/1 en false/true
    }

    protected $casts = [
        'intolerance_religion' => 'array', // Laravel convierte automáticamente JSON a array y viceversa
    ];
}
