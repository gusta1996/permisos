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
            $title = 'Contratos y cargos';
            require '../template/header.php';
            require './page/asignar-cargo-index.php';
    
        } elseif ($_GET['page'] == 'registro') {
            // Titulo, header, contenido
            $title = 'Registros de contratos y cargos';
            require '../template/header.php';
            require './page/asignar-cargo-registro.php';
    
        } 

        require '../template/footer.php';
    } else {
        // Si usuario es estandar o autorizador, redicciona a home
        header('location: ../views/');
    }
} else {
    // No hay sesión, redicciona a login
    header('location: ../views/');
} ?>