<?php

class Role {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // Obtener todos los roles
    public function getAll() {
        $stmt = $this->pdo->query('SELECT * FROM roles');
        return $stmt->fetchAll();
    }

    // Crear un nuevo rol
    public function create($name) {
        $stmt = $this->pdo->prepare('INSERT INTO roles (name, guard_name, created_at, updated_at) VALUES (?, "web", NOW(), NOW())');
        return $stmt->execute([$name]);
    }

    // Obtener un rol por ID
    public function getById($id) {
        $stmt = $this->pdo->prepare('SELECT * FROM roles WHERE id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch();
    }

    // Actualizar un rol existente
    public function update($id, $name) {
        $stmt = $this->pdo->prepare('UPDATE roles SET name = ?, updated_at = NOW() WHERE id = ?');
        return $stmt->execute([$name, $id]);
    }

    // Eliminar un rol
    public function delete($id) {
        $stmt = $this->pdo->prepare('DELETE FROM roles WHERE id = ?');
        return $stmt->execute([$id]);
    }
}
