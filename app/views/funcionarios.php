<?php
require '../models/user.php';
require '../models/user_session.php';

$userSession = new UserSession();
$user = new User();

if ($userSession->userLoggedIn()) {
    // Hay sesión
    $user->setUser($userSession->getCurrentUser());
    // Verifica el rol de usuario
    $administrador = $user->getRol() == 'administrador' ? true : false;
    $autorizador = $user->getRol() == 'autorizador' ? true : false;

    if ($administrador) {
        // Acceso solo para administrador

        if (!isset($_GET['page'])) {
            // Titulo, header, contenido
            $title = 'Funcionarios';
            require '../template/header.php';
            require './page/funcionarios-index.php';
    
        } elseif ($_GET['page'] == 'crear') {
            // Titulo, header, contenido
            $title = 'Funcionarios - Crear funcionario';
            require '../template/header.php';
            require './page/funcionarios-crear.php';
    
        }
        
        // footer
        require '../template/footer.php';
    } else {
        // Si usuario es estandar o autorizador, redicciona a home
        header('location: ../views/');
    }
} else {
    // No hay sesión, redicciona a login
    header('location: ../views/');
} ?>