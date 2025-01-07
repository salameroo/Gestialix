<?php

class AdminUser
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    // Obtener un administrador por username
    public function getByUsername($username)
    {
        $stmt = $this->pdo->prepare('SELECT * FROM admin_users WHERE username = ?');
        $stmt->execute([$username]);
        return $stmt->fetch();
    }
}
