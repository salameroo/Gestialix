<?php

class School {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // Obtener todos los colegios
    public function getAll() {
        $stmt = $this->pdo->query('SELECT * FROM app_schools');
        return $stmt->fetchAll();
    }

    // Crear un nuevo colegio
    public function create($data) {
        $stmt = $this->pdo->prepare('INSERT INTO app_schools (name, cif, address, city, state, country, zip) VALUES (?, ?, ?, ?, ?, ?, ?)');
        return $stmt->execute([
            $data['name'], $data['cif'], $data['address'],
            $data['city'], $data['state'], $data['country'], $data['zip']
        ]);
    }

    // Actualizar un colegio existente
    public function update($id, $data) {
        $stmt = $this->pdo->prepare('UPDATE app_schools SET name = ?, cif = ?, address = ?, city = ?, state = ?, country = ?, zip = ? WHERE id = ?');
        return $stmt->execute([
            $data['name'], $data['cif'], $data['address'],
            $data['city'], $data['state'], $data['country'], $data['zip'], $id
        ]);
    }

    // Eliminar un colegio
    public function delete($id) {
        $stmt = $this->pdo->prepare('DELETE FROM app_schools WHERE id = ?');
        return $stmt->execute([$id]);
    }

    // Obtener un colegio por ID
    public function get($id) {
        $stmt = $this->pdo->prepare('SELECT * FROM app_schools WHERE id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch();
    }
}
