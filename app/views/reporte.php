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
    $validador = $user->getRol() == 'validador' ? true : false;

    if ($administrador || $autorizador || $validador) {
        if (!isset($_GET['page'])) {
            // Titulo, header, contenido
            $title = 'Reportes';
            require '../template/header.php';
            require './page/reporte-index.php';

        } elseif ($_GET['page'] == 'descargar') {
            // Titulo, header, contenido
            $title = 'Reportes - Reporte mensual';
            require '../template/header.php';
            require './page/reporte-descargar.php';

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
}
