<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

class RenameSpatiePermissionTables extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Schema::rename('permissions', 'spatie_permissions');
        // Schema::rename('roles', 'spatie_roles');
        // Schema::rename('model_has_permissions', 'spatie_model_has_permissions');
        // Schema::rename('model_has_roles', 'spatie_model_has_roles');
        // Schema::rename('role_has_permissions', 'spatie_role_has_permissions');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::rename('spatie_permissions', 'permissions');
        // Schema::rename('spatie_roles', 'roles');
        // Schema::rename('spatie_model_has_permissions', 'model_has_permissions');
        // Schema::rename('spatie_model_has_roles', 'model_has_roles');
        // Schema::rename('spatie_role_has_permissions', 'role_has_permissions');
    }
}
