<?php

class User
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
        $stmt = $this->pdo->prepare('INSERT INTO users (name, email, password, school_id) VALUES (?, ?, ?, ?)');
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
        return $stmt->execute([$data['name'], $data['email'], $hashedPassword, $data['school_id']]);
    }

    // Actualizar un usuario existente
    public function update($id, $data)
    {
        $stmt = $this->pdo->prepare('UPDATE laravel_users SET username = ?, role = ? WHERE id = ?');
        return $stmt->execute([$data['username'], $data['role'], $id]);
    }

    // Eliminar un usuario
    public function delete($id)
    {
        $stmt = $this->pdo->prepare('DELETE FROM laravel_users WHERE id = ?');
        return $stmt->execute([$id]);
    }

    // Buscar un usuario por nombre de usuario
    public function getByUsername($username)
    {
        $stmt = $this->pdo->prepare('SELECT * FROM laravel_users WHERE username = ?');
        $stmt->execute([$username]);
        return $stmt->fetch();
    }

    public function getSchools()
    {
        $school_id = $this->pdo->query('SELECT school_id FROM laravel_users');
        $school_info = $this->pdo->query('SELECT * FROM app_schools WHERE id = ?');
        return $school_info->fetchAll();
    }
}
