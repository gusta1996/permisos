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
        $title = 'Permisos de usuario';
        require '../template/header.php';
        ?>

            <div class="lg:hidden flex">
                <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
            </div>

            <div id="permisos-de-usuario" class="bg-white rounded-md shadow-sm mb-6">
                <!-- Titulo -->
                <div class="border-b border-gray-900/10 p-4">
                    <h2 class="text-lg font-semibold leading-7 text-gray-900">Editar permisos de usuario</h2>
                </div>

                <div class="px-4 py-6">
                    <!-- Busqueda de funcionario -->
                    <form action="javascript:void(0);" onsubmit="appPermisosUsario.verPermisos()" class="flex flex-wrap sm:flex-nowrap sm:flex-row justify-between items-center gap-4">
                        <label class="w-full sm:w-auto flex-initial text-sm font-medium leading-6 text-gray-900">Nombre:</label>
                        <select id="funcionario-permisos" required class="selectBuscador h-[38px] w-full sm:w-auto flex-auto rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                            <option value="" selected disabled>-- Selecciona --</option>
                        </select>
                        <button type="submit" class="w-full sm:w-auto flex-initial whitespace-nowrap rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ver permisos</button>
                    </form>

                    <!-- Icono de carga -->
                    <div id="icono-carga" class="hidden animate-spin flex justify-center py-4 mt-6"></div>

                    <!-- Formulario permisos -->
                    <form id="form-editar-permisos" action="javascript:void(0);" onsubmit="appPermisosUsario.guardarPermisos()" class="hidden mt-6">
                        <div class="grid grid-cols-1 gap-6 lg:grid-cols-6">
                            <!-- Info usuario -->
                            <div class="flex items-center gap-4 bg-red-100 p-4 rounded-md border border-red-900/10 lg:col-span-6">
                                <label class="block text-base font-medium leading-6 text-gray-900">Rol de usuario:</label>
                                <p id="rol-usuario" class="text-base"></p>
                            </div>
                            <!-- Modulo -->
                            <div class="bg-slate-100 p-4 rounded-md border lg:col-span-2">
                                <label class="block text-base font-medium leading-6 text-gray-900">Módulos:</label>
                                <div id="permiso-modulos"></div>
                            </div>
                            <!-- Actividad -->
                            <div class="bg-slate-100 p-4 rounded-md border lg:col-span-4">
                                <label class="block text-base font-medium leading-6 text-gray-900">Actividades:</label>
                                <div id="permiso-actividades"></div>
                            </div>
                        </div>

                        <!-- Mensaje de no guardado -->
                        <div id="mensaje-no-guardado" class="sm:col-span-6"></div>

                        <div class="grid grid-cols-1 gap-6 lg:grid-cols-6 text-center">
                            <a href="javascript:void(0);" onclick="appPermisosUsario.restaurarPermisos()" id="btn-restaurar-permisos" class="w-full lg:col-span-3 rounded-md bg-red-500 px-4 py-2 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Restaurar permisos</a>
                            <button type="submit" id="btn-actualizar-permisos" class="w-full lg:col-span-3 rounded-md bg-indigo-500 px-4 py-2 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Actualizar permisos</button>
                        </div>
                    </form>
                </div>
            </div>

            <script src="../assets/scriptPermisosUsuario.js"></script>

        <?php
        require '../template/footer.php';
    } else {
        // Si usuario es estandar o autorizador, redicciona a home
        header('location: ../views/');
    }
} else {
    // No hay sesión, redicciona a login
    header('location: ../views/');
} ?>