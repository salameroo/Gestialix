<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define los permisos
        $permissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            'view permissions',
            'assign permissions',
        ];

        // Crear los permisos
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Crear roles y asignar permisos
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // Asignar todos los permisos al rol de administrador
        $adminRole->syncPermissions($permissions);

        // Asignar permisos específicos al rol de usuario
        $userRole->syncPermissions([
            'view users',
        ]);

        // Mensaje de confirmación
        $this->command->info('Permisos y roles creados con éxito.');
    }
}
