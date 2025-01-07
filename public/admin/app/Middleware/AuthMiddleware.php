<?php

class AuthMiddleware
{
    public static function handle()
    {
        session_start();
        if (!isset($_SESSION['admin'])) {
            header('Location: /login.php');
            exit;
        }
    }
}
