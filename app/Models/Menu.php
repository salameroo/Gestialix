<?php
// app/Models/Menu.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = ['fecha', 'descripcion'];

    public function menuServicios()
    {
        return $this->hasMany(MenuServicio::class);
    }
}
