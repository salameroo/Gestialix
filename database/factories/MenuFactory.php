<?php
// database/factories/MenuFactory.php
use App\Models\Menu;
use Illuminate\Database\Eloquent\Factories\Factory;

class MenuFactory extends Factory
{
    protected $model = Menu::class;

    public function definition()
    {
        return [
            'fecha' => $this->faker->dateTimeThisMonth,
            'descripcion' => $this->faker->sentence,
        ];
    }
}
