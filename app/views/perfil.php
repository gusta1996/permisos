<?php
require '../models/user.php';
require '../models/user_session.php';

$userSession = new UserSession();
$user = new User();


if ($userSession->userLoggedIn()) {
    // Hay sesión
    $user->setUser($userSession->getCurrentUser());
    // Titulo de la pagina
    $title = (!isset($_GET['page']) ? 'Perfil' : 'Perfil - editar perfil');
    // header
    require '../template/header.php';

    // cuerpo
    if (!isset($_GET['page'])) {
        // Pagina perfil
        require './page/perfil-index.php';
    } elseif ($_GET['page'] == 'editar') {
        // Pagina editar perfil
        require './page/perfil-editar.php';
    }

    // footer
    require '../template/footer.php';
} else {
    // No hay sesión, redicciona a login
    header('location: ../views/');
}