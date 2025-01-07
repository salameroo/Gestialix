<?php

require_once __DIR__ . '/../Models/School.php';

class SchoolController
{
    private $model;

    public function __construct($pdo)
    {
        $this->model = new School($pdo);
    }

    // Mostrar todos los colegios
    public function index()
    {
        $schools = $this->model->getAll();

        // Capturar el contenido de la vista
        ob_start();
        require __DIR__ . '/../Views/schools/index.php';
        $content = ob_get_clean();

        // Cargar el layout con el contenido
        require __DIR__ . '/../Views/layout.php';
    }

    public function create()
    { // Capturar el contenido de la vista
        ob_start();
        require __DIR__ . '/../Views/schools/form.php';
        $content = ob_get_clean();

        // Cargar el layout con el contenido
        require __DIR__ . '/../Views/layout.php';
    }

    public function edit($id)
    {
        $id = $_GET['id'] ?? null;
        $school = $this->model->get($id);

        // Capturar el contenido de la vista
        ob_start();
        require __DIR__ . '/../Views/schools/form.php';
        $content = ob_get_clean();

        // Cargar el layout con el contenido
        require __DIR__ . '/../Views/layout.php';
    }

    // Crear un nuevo colegio
    public function store($data)
    {
        if ($this->model->create($data)) {
            header('Location: /?success=Colegio creado correctamente');
        } else {
            header('Location: /?error=Error al crear el colegio');
        }
    }

    // Actualizar un colegio existente
    public function update($id, $data)
    {
        if ($this->model->update($id, $data)) {
            header('Location: /?success=Colegio actualizado correctamente');
        } else {
            header('Location: /?error=Error al actualizar el colegio');
        }
    }

    // Eliminar un colegio
    public function destroy($id)
    {
        if ($this->model->delete($id)) {
            header('Location: /?success=Colegio eliminado correctamente');
        } else {
            header('Location: /?error=Error al eliminar el colegio');
        }
    }
}
