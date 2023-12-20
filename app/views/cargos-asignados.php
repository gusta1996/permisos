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
        $title = 'Contratos y cargos';
        require '../template/header.php';
?>

        <div class="lg:hidden flex">
            <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
        </div>

        <!-- Ver / Editar contratos y cargos -->
        <div id="permisos-de-usuario" class="bg-white rounded-md shadow-sm mb-6">
            <!-- Titulo -->
            <div class="border-b border-gray-900/10 p-4">
                <h2 class="text-lg font-semibold leading-7 text-gray-900">Editar contratos y cargos</h2>
            </div>

            <div class="px-4 py-6">
                <!-- Busqueda de funcionario -->
                <form action="javascript:void(0);" onsubmit="app.verContratoEstructura()" class="flex flex-wrap sm:flex-nowrap sm:flex-row justify-between items-center gap-4">
                    <label class="w-full sm:w-auto flex-initial text-sm font-medium leading-6 text-gray-900">Nombre:</label>
                    <select id="funcionario-funcionarioEstructura" required class="selectBuscador h-[38px] w-full sm:w-auto flex-auto rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                        <option value="" selected disabled>-- Selecciona --</option>
                    </select>
                    <button type="submit" class="w-full sm:w-auto flex-initial whitespace-nowrap rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ver cargo y contrato</button>
                </form>

                <!-- Icono de carga -->
                <div id="icono-carga" class="hidden animate-spin flex justify-center py-4 mt-6"></div>

                <!-- Formulario contratos y cargos -->
                <form id="ver-guardar-contratoEstructura" action="javascript:void(0);" onsubmit="app.actualizarContratoEstructura()" class="hidden bg-slate-100 p-4 mt-6 rounded-md border">
                    <h3 class="text-center mb-4 text-base font-semibold leading-7 text-gray-900">Información ocupacional</h3>
                    <div class="mb-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <!-- Funcionario -->
                        <div id="ver-funcionario" class="sm:col-span-2"></div>

                        <!-- Contrato -->
                        <div id="ver-guardar-contrato" class="sm:col-span-4"></div>

                        <!-- Estructura -->
                        <div id="ver-guardar-estructura" class="sm:col-span-6"></div>
                    </div>
                    <!-- Mensaje de no guardado -->
                    <div id="mensaje-no-guardado" class="sm:col-span-6"></div>

                    <button type="submit" id="btn-actualizar-contrato-estructura" class="w-full lg:col-span-3 rounded-md bg-indigo-500 px-4 py-2 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Actualizar contratos y cargos</button>
                </form>
            </div>
        </div>

        <!-- Boton ver Registros -->
        <a id="btn-registros" href="javascript:app.btnVerRegistros();" class="inline-block rounded-md shadow-sm bg-indigo-500 px-3 py-2 mb-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ver registros</a>

        <!-- Registros de contratos y cargos -->
        <div id="registros-permisos" class="hidden">
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
                <div class="border-b border-gray-900/10 p-4">
                    <div class="flex items-center justify-between gap-6 mb-5">
                        <!-- Titulo -->
                        <h2 class="flex-auto text-lg font-semibold leading-7 text-gray-900">Registros de contratos y cargos</h2>
                        <!-- Buscar por Tipo -->
                        <h3 class="text-base font-medium leading-7 text-gray-900">Buscar por:</h3>
                        <div class="w-52">
                            <select id="busqueda-tipo" class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                                <option value="apellidos" selected>Apellidos</option>
                                <option value="nombres">Nombres</option>
                                <option value="cedula">Cédula</option>
                            </select>
                        </div>
                    </div>
                    <!-- Barra de busqueda -->
                    <form action="javascript:void(0);" oninput="app.busquedaFuncionarioEstructura()">
                        <div class="relative mb-1">
                            <div class="absolute flex items-center h-full text-gray-500 pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                            <input type="search" id="busqueda-funcionarioEstructura" placeholder="Búsqueda..." class="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm">
                        </div>
                    </form>
                </div>

                <!-- Tabla Funcionario-Estructura -->
                <div class="p-4">
                    <!-- Tabla Funcionario-Estructura -->
                    <table class="w-full text-xs md:text-sm text-left">
                        <thead>
                            <tr class="h-14 border-b border-b-slate-400">
                                <th class="font-medium pr-4">ID</th>
                                <th class="font-medium pr-4">Funcionario</th>
                                <th class="font-medium pr-4">Contrato</th>
                                <th class="font-medium pr-4">Cargo</th>
                                <th class="font-medium">Estado</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyFuncionarioEstructura">

                        </tbody>
                    </table>

                    <!-- Paginacion -->
                    <div id="paginacion" class="flex text-center mt-4 items-center">
                    </div>

                    <!-- Modal Editar -->
                    <div id="modal-funcionarioEstructura">

                    </div>
                </div>
            </div>
        </div>

        <script src="../assets/scriptFuncionarioEstructura.js"></script>

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