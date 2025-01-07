<?php

require_once __DIR__ . '/../Models/LaravelUser.php';
require_once __DIR__ . '/../Models/School.php';

class UserController
{
    private $model;
    private $schoolModel;

    public function __construct($pdo)
    {
        $this->model = new LaravelUser($pdo);
        $this->schoolModel = new School($pdo);
    }

    // Listar todos los usuarios
    public function index()
    {
        $users = $this->model->getAll();
        // var_dump($users);
        ob_start();
        require __DIR__ . '/../Views/users/index.php';
        $content = ob_get_clean();

        require __DIR__ . '/../Views/layout.php'; // Layout principal
    }

    // Mostrar el formulario para crear un usuario
    public function create()
    {
        $schools = $this->schoolModel->getAll(); // Usa un modelo o consulta para obtener los colegios
        ob_start();
        // Obtener la lista de colegios
        require __DIR__ . '/../Views/users/form.php';
        $content = ob_get_clean();
        // Mostrar el formulario de creación de usuario
        require __DIR__ . '/../Views/layout.php';
    }


    // Guardar un nuevo usuario en la base de datos
    public function store($data)
    {
        // Validación básica
        if (empty($data['name']) || empty($data['email']) || empty($data['password']) || empty($data['school_id'])) {
            header('Location: /?entity=users&action=create&error=Todos los campos son obligatorios');
            return;
        }

        // Crear el usuario en la base de datos
        if ($this->model->create($data)) {
            header('Location: /?entity=users&action=index&success=Usuario creado correctamente');
        } else {
            header('Location: /?entity=users&action=create&error=Error al crear el usuario');
        }
    }


    // Mostrar el formulario para editar un usuario existente
    public function edit($id)
    {
        if (!$id) {
            header('Location: /?entity=users&action=index&error=ID de usuario no proporcionado');
            return;
        }

        $user = $this->model->getById($id);
        if (!$user) {
            header('Location: /?entity=users&action=index&error=Usuario no encontrado');
            return;
        }

        require __DIR__ . '/../Views/users/form.php';
    }

    // Actualizar un usuario existente
    public function update($id, $data)
    {
        if (!$id) {
            header('Location: /?entity=users&action=index&error=ID de usuario no proporcionado');
            return;
        }

        // Validación básica
        if (empty($data['name']) || empty($data['email'])) {
            header('Location: /?entity=users&action=edit&id=' . $id . '&error=Todos los campos son obligatorios');
            return;
        }

        if ($this->model->update($id, $data)) {
            header('Location: /?entity=users&action=index&success=Usuario actualizado correctamente');
        } else {
            header('Location: /?entity=users&action=edit&id=' . $id . '&error=Error al actualizar el usuario');
        }
    }

    // Eliminar un usuario
    public function destroy($id)
    {
        if (!$id) {
            header('Location: /?entity=users&action=index&error=ID de usuario no proporcionado');
            return;
        }

        if ($this->model->delete($id)) {
            header('Location: /?entity=users&action=index&success=Usuario eliminado correctamente');
        } else {
            header('Location: /?entity=users&action=index&error=Error al eliminar el usuario');
        }
    }
}
