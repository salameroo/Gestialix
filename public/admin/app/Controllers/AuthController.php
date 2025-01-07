<?php

require_once __DIR__ . '/../Models/AdminUser.php';

class AuthController
{
    private $model;

    public function __construct($pdo)
    {
        $this->model = new AdminUser($pdo);
    }

    // Muestra el formulario de login
    public function showLogin()
    {
        require __DIR__ . '/../Views/auth/login.php';
    }

    // Maneja el login
    public function login($data)
    {
        $admin = $this->model->getByUsername($data['username']);

        if ($admin && password_verify($data['password'], $admin['password'])) {
            session_start();
            $_SESSION['admin'] = [
                'id' => $admin['id'],
                'username' => $admin['username']
            ];
            header('Location: /dashboard.php');
        } else {
            header('Location: /login.php?error=Credenciales incorrectas');
        }
    }

    public function logout()
    {
        session_start();
        session_destroy();
        header('Location: /login.php');
        exit;
    }
}
