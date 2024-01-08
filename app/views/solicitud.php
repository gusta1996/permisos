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

    if (!isset($_GET['page'])) {
        // Titulo, header, contenido
        $title = 'Solicitudes de permisos';
        require '../template/header.php';
        require './page/solicitud-index.php';
    } elseif ($_GET['page'] == 'crear') {
        // Titulo, header, contenido
        $title = 'Crear nueva solicitud - Solicitudes de permisos';
        require '../template/header.php';
        require './page/solicitud-crear.php';
    } else {
        // Titulo, header, contenido
        $title = 'Pagina no encontrada';
        require '../template/header.php';
        echo 'Pagina no escontrada';
    }

    // footer
    require '../template/footer.php';
} else {
    // No hay sesión, redicciona a login
    header('location: ../views/');
}
