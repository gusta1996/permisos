<?php
require '../models/user.php';
require '../models/user_session.php';

$userSession = new UserSession();
$user = new User();

if (isset($_SESSION['user'])) {
    // Hay sesión
    $user->setUser($userSession->getCurrentUser());
    require './home.php';
} else if (isset($_POST['username']) && isset($_POST['password'])) {
    // Inicia sesion, validación de login
    $userForm = $_POST['username'];
    $passForm = $_POST['password'];

    if ($user->userExists($userForm, $passForm)) {
        // usuario validado
        $userSession->setCurrentUser($userForm);
        $user->setUser($userForm);

        if ($user->getFuncionarioEstado() == 'Activo') {
            // muestra home
            require './home.php';
        } else if ($user->getFuncionarioEstado() == 'Anulado') {
            // cerrar sesion
            $userSession->closeSession();
            // Su cuenta a sido deshabilitada
            $errorLogin = "¡Su cuenta a sido deshabilitada!";
            require './login.php';
        }
    } else {
        // Nombre de usuario y/o password incorrecto
        $errorLogin = "Nombre de usuario y/o password es incorrecto";
        require './login.php';
    }
} else {
    // No hay sesion, Mostrar login
    require './login.php';
}
