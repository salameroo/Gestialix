<?php

require_once __DIR__ . '/../Models/Role.php';

class RoleController
{
    private $model;

    public function __construct($pdo)
    {
        $this->model = new Role($pdo);
    }

    // Listar todos los roles
    public function index()
    {
        $roles = $this->model->getAll();
        ob_start();
        require __DIR__ . '/../Views/roles/index.php';
        $content = ob_get_clean();

        // Cargar el layout con el contenido
        require __DIR__ . '/../Views/layout.php';
    }

    public function create()
    {
        ob_start();
        require __DIR__ . '/../Views/roles/form.php';
        $content = ob_get_clean();

        // Cargar el layout con el contenido
        require __DIR__ . '/../Views/layout.php';
    }

    // Crear un nuevo rol
    public function store($data)
    {
        if (empty($data['name'])) {
            header('Location: /?entity=roles&action=create&error=El nombre del rol es obligatorio');
            return;
        }

        if ($this->model->create($data['name'])) {
            header('Location: /?entity=roles&action=index&success=Rol creado correctamente');
        } else {
            header('Location: /?entity=roles&action=create&error=Error al crear el rol');
        }
    }

    // Editar un rol existente
    public function edit($id)
    {
        $role = $this->model->getById($id);
        if (!$role) {
            header('Location: /?entity=roles&action=index&error=Rol no encontrado');
            return;
        }

        require __DIR__ . '/../Views/roles/form.php';
    }

    // Actualizar un rol existente
    public function update($id, $data)
    {
        if (empty($data['name'])) {
            header('Location: /?entity=roles&action=edit&id=' . $id . '&error=El nombre del rol es obligatorio');
            return;
        }

        if ($this->model->update($id, $data['name'])) {
            header('Location: /?entity=roles&action=index&success=Rol actualizado correctamente');
        } else {
            header('Location: /?entity=roles&action=edit&id=' . $id . '&error=Error al actualizar el rol');
        }
    }

    // Eliminar un rol
    public function destroy($id)
    {
        if ($this->model->delete($id)) {
            header('Location: /?entity=roles&action=index&success=Rol eliminado correctamente');
        } else {
            header('Location: /?entity=roles&action=index&error=Error al eliminar el rol');
        }
    }
}
