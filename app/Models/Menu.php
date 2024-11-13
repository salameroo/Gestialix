<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    // Definir los campos que pueden asignarse en masa
    protected $fillable = ['name', 'description', 'date'];
}
