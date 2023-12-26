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

        if ($user->getUsuarioEstado() == 'suspendido') { // Usuario suspendido
            // cerrar sesion
            $userSession->closeSession();
            // Su cuenta a sido suspendida
            $errorLogin = "¡Su cuenta a sido SUSPENDIDA, hable con el departamento de sistemas!";
            require './login.php';

        } else if ($user->getUsuarioEstado() == 'anulado') { // Usuario anulado
            // cerrar sesion
            $userSession->closeSession();
            // Su cuenta a sido anulada
            $errorLogin = "¡Su cuenta a sido ANULADA, hable con el departamento de sistemas!";
            require './login.php';

        } else if ($user->getFuncionarioEstado() == 'suspendido') { // Funcionario suspendido
            // cerrar sesion
            $userSession->closeSession();
            // Su cuenta a sido deshabilitada
            $errorLogin = "¡Ustéd ha sido SUSPENDIDO, hable con el departamento de sistemas!";
            require './login.php';

        } else if ($user->getFuncionarioEstado() == 'anulado') { // Funcionario despedido
            // cerrar sesion
            $userSession->closeSession();
            // Ustéd ya no trabaja con nosotros
            $errorLogin = "¡Ustéd ya no trabaja con nosotros!";
            require './login.php';

        } else if ($user->getUsuarioEstado() == 'activo' && $user->getFuncionarioEstado() == 'activo') {
            // Acceso exitoso!!
            require './home.php';

        }
    } else {
        // Nombre de usuario o contraseña incorrecta
        $errorLogin = "Nombre de usuario o contraseña incorrecta";
        require './login.php';
        
    }
} else {
    // No hay sesion, Mostrar login
    require './login.php';
}
