<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Crear permisos
        $permissions = [
            'ver_dashboard',
            'gestionar_clases',
            'gestionar_estudiantes',
            'ver_reportes',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Crear roles y asignar permisos
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        $profesor = Role::create(['name' => 'profesor']);
        $profesor->givePermissionTo(['gestionar_clases', 'ver_dashboard']);

        $padre = Role::create(['name' => 'padre']);
        $padre->givePermissionTo(['ver_reportes']);
    }
}
