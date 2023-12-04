<?php
require '../models/user.php';
require '../models/user_session.php';

$userSession = new UserSession();
$user = new User();

if ($userSession->userLoggedIn()) {
    // Hay sesión
    $user->setUser($userSession->getCurrentUser());

    if (!isset($_GET['page'])) {
        // Titulo, header, contenido
        $title = 'Perfil';
        require '../template/header.php';
        require './page/perfil-index.php';

    } elseif ($_GET['page'] == 'editar') {
        // Titulo, header, contenido
        $title = 'Perfil - editar perfil';
        require '../template/header.php';
        require './page/perfil-editar.php';

    } elseif ($_GET['page'] == 'contrasena') {
        // Titulo, header, contenido
        $title = 'Perfil - cambiar contraseña';
        require '../template/header.php';
        require './page/perfil-cambiar-contrasena.php';

    }

    // footer
    require '../template/footer.php';
} else {
    // No hay sesión, redicciona a login
    header('location: ../views/');
}