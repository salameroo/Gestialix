<?php

class LaravelUser
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    // Obtener todos los usuarios
    public function getAll()
    {
        $query = '
        SELECT u.id, u.name, u.email, u.school_id, s.name AS school_name
        FROM laravel_users u
        LEFT JOIN app_schools s ON u.school_id = s.id
    ';
        $stmt = $this->pdo->query($query);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Crear un nuevo usuario
    public function create($data)
    {
        $stmt = $this->pdo->prepare('INSERT INTO laravel_users (name, email, password, school_id) VALUES (?, ?, ?, ?)');
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
        return $stmt->execute([$data['name'], $data['email'], $hashedPassword, $data['school_id']]);
    }

    // public function create($data)
    // {
    //     $stmt = $this->pdo->prepare('INSERT INTO laravel_users (name, email, password) VALUES (?, ?, ?)');
    //     $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
    //     return $stmt->execute([$data['name'], $data['email'], $hashedPassword]);
    // }

    // Obtener un usuario por ID
    public function getById($id)
    {
        $stmt = $this->pdo->prepare('SELECT id, name, email FROM laravel_users WHERE id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    // Actualizar un usuario existente
    public function update($id, $data)
    {
        $stmt = $this->pdo->prepare('UPDATE laravel_users SET name = ?, email = ?, WHERE id = ?');
        return $stmt->execute([$data['name'], $data['email'] ?? null, $id]);
    }

    // Eliminar un usuario
    public function delete($id)
    {
        $stmt = $this->pdo->prepare('DELETE FROM laravel_users WHERE id = ?');
        return $stmt->execute([$id]);
    }
}
