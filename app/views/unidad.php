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
        $title = 'Unidad';
        require '../template/header.php';
?>

        <div class="lg:hidden flex">
            <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
        </div>

        <div class="bg-white rounded-md shadow-sm mb-6">
            <!-- Titulo -->
            <div class="border-b border-gray-900/10 p-4">
                <h2 class="text-lg font-semibold leading-7 text-gray-900">Agregar unidad</h2>
            </div>

            <!-- Formulario Unidad -->
            <div class="p-4">
                <form action="javascript:void(0);" onsubmit="appUnidad.guardarUnidad()">
                    <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7">
                        <!-- Switch: ¿Agregar unidad sin nombre? -->
                        <div class="sm:col-span-7">
                            <style>
                                .toggle-checkbox:checked {
                                    right: 0;
                                    border-color: #68D391;
                                    background-color: #68D391;
                                }

                                .toggle-checkbox:checked+.toggle-label {
                                    background-color: #1F2937;
                                }
                            </style>

                            <label for="unidad-sin-nombre" class="mr-4 cursor-pointer text-sm font-medium leading-6 text-gray-900">¿Agregar unidad sin nombre?</label>
                            <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="unidad-sin-nombre" id="unidad-sin-nombre" onchange="appUnidad.checkboxUnidadSinNombre()" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                                <label for="unidad-sin-nombre" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                        </div>

                        <!-- Unidad -->
                        <div class="sm:col-span-3">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Nueva unidad:</label>
                            <div class="mt-2">
                                <input type="text" required id="detalle-unidad" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                            </div>
                        </div>

                        <!-- Dirección -->
                        <div class="sm:col-span-3">
                            <label class="block text-sm font-medium leading-6 text-gray-900">Dirección al que pertenece:</label>
                            <div class="mt-2">
                                <select id="direccion-unidad" required class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                    <option value="" selected disabled>-- Selecciona --</option>
                                </select>
                            </div>
                        </div>

                        <div class="mt-auto">
                            <button type="submit" class="w-full rounded-md bg-indigo-500 px-4 py-2 m-auto text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Crear</button>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Mensaje de error -->
            <div id="error-unidad" class="hidden p-4">
            </div>
        </div>

        <!-- Mensaje -->
        <div class="flex gap-4 mb-4">
            <div class="flex items-center gap-2 bg-green-200 rounded-md shadow-sm px-3 py-2 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill ${item[i].f_estado == 'activo' ? 'text-green-600' : ''}${item[i].f_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].f_estado == 'anulado' ? 'text-red-600' : ''}" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8" />
                </svg>Activo
            </div>
            <div class="flex items-center gap-2 bg-amber-200 rounded-md shadow-sm px-3 py-2 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill ${item[i].f_estado == 'activo' ? 'text-green-600' : ''}${item[i].f_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].f_estado == 'anulado' ? 'text-red-600' : ''}" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8" />
                </svg>Suspendido
            </div>
            <div class="flex items-center gap-2 bg-red-200 rounded-md shadow-sm px-3 py-2 text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-circle-fill ${item[i].f_estado == 'activo' ? 'text-green-600' : ''}${item[i].f_estado == 'suspendido' ? 'text-amber-400' : ''}${item[i].f_estado == 'anulado' ? 'text-red-600' : ''}" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="8" />
                </svg>Anulado
            </div>
        </div>

        <div class="bg-white rounded-md shadow-sm mb-6">
            <!-- Titulo -->
            <div class="border-b border-gray-900/10 p-4">
                <h2 class="text-lg font-semibold leading-7 text-gray-900 mb-2">Buscar unidad</h2>
                <form action="javascript:void(0);" oninput="appUnidad.busquedaUnidad()">
                    <div class="relative mb-1">
                        <div class="absolute flex items-center h-full text-gray-500 pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </div>
                        <input type="search" id="busqueda-unidad" placeholder="Búsqueda..." class="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm">
                    </div>
                </form>
            </div>
            <div class="p-4 rounded-md mb-4">
                <!-- Tabla Unidad -->
                <table class="w-full text-xs md:text-sm text-left">
                    <thead>
                        <tr class="h-14 border-b border-b-slate-400">
                            <th class="font-medium pr-4">ID</th>
                            <th class="font-medium pr-4">Unidad</th>
                            <th class="font-medium pr-4">Dirección</th>
                            <th class="font-medium pr-4">Estado</th>
                            <th class="font-medium text-right">Opciones</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyUnidad">

                    </tbody>
                </table>

                <!-- Paginacion -->
                <div id="paginacion" class="flex text-center mt-4 items-center">
                </div>

                <!-- Modal Editar -->
                <div id="modal-unidad">

                </div>
            </div>
        </div>

        <script src="../assets/scriptUnidad.js"></script>

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