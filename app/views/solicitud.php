<?php
require '../models/user.php';
require '../models/user_session.php';

$userSession = new UserSession();
$user = new User();

if ($userSession->userLoggedIn()) {
    // Hay sesión
    $user->setUser($userSession->getCurrentUser());
    $title = 'Solicitudes';
    require '../template/header.php'; ?>

    <div class="lg:hidden flex">
        <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
    </div>

    <a id="btn-solicitud" href="javascript:appSolicitud.btnCrearSolicitud();" class="flex items-center w-max gap-2 rounded-md shadow-sm bg-indigo-500 px-3 py-2 mb-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
        </svg>Añadir solicitud
    </a>

    <?php
    if ( $user->getRol() == 'Estandar' ) {
        // Vista para usuario estandar
        require './solicitud/soli-estandar.php';
    } else {
        // vista para otros usuarios
        require './solicitud/soli-administrador.php';
    }
    ?>

<?php
    require '../template/footer.php';
} else {
    // No hay sesión, redicciona a login
    header('location: ../views/');
} ?>