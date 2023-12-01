<?php
require '../models/user.php';
require '../models/user_session.php';

$userSession = new UserSession();
$user = new User();

if ($userSession->userLoggedIn()) {
    // Hay sesión
    $user->setUser($userSession->getCurrentUser());
    $title = 'Estructura';
    require '../template/header.php'; ?>

    <div class="lg:hidden flex">
        <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
    </div>

    <div class="flex items-center gap-2 bg-emerald-200 rounded-md shadow-sm mb-6 p-4 text-emerald-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
        <p>¿Que es Estructura? Es la funcion laboral que se le otorga a cada funcionario.</p>
    </div>

    <div class="bg-white rounded-md shadow-sm mb-6">
        <!-- Titulo -->
        <div class="border-b border-gray-900/10 p-4">
            <h2 class="text-lg font-semibold leading-7 text-gray-900">Agregar estructura</h2>
        </div>
        <!-- Formulario Estructura -->
        <div class="p-4">
            <form action="javascript:void(0);" onsubmit="app.guardarEstructura()">
                <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                    <!-- Cargo -->
                    <div class="sm:col-span-2">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Cargo</label>
                        <div class="mt-2">
                            <select id="cargo-estructura" required class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                <option value="" selected disabled>-- Selecciona --</option>
                            </select>
                        </div>
                    </div>

                    <!-- Sección -->
                    <div class="sm:col-span-2">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Sección</label>
                        <div class="mt-2">
                            <select id="seccion-estructura" required class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                <option value="" selected disabled>-- Selecciona --</option>
                            </select>
                        </div>
                    </div>

                    <!-- Departamento -->
                    <div class="sm:col-span-2">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Departamento</label>
                        <div class="mt-2">
                            <select id="departamento-estructura" required class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                <option value="" selected disabled>-- Selecciona --</option>
                            </select>
                        </div>
                    </div>

                    <!-- Área -->
                    <div class="sm:col-span-2">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Área</label>
                        <div class="mt-2">
                            <select id="area-estructura" required class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                <option value="" selected disabled>-- Selecciona --</option>
                            </select>
                        </div>
                    </div>

                    <div class="sm:col-span-4 mt-auto">
                        <button type="submit" class="w-full rounded-md bg-indigo-500 px-4 py-2 m-auto text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Crear</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="bg-white rounded-md shadow-sm mb-6">
        <!-- Titulo -->
        <div class="border-b border-gray-900/10 p-4">
            <div class="flex items-center gap-8 mb-4">
                <h2 class="text-lg font-semibold leading-7 text-gray-900">Buscar estructura por:</h2>
                <!-- Tipo -->
                <div class="w-64">
                    <select id="busqueda-tipo" required class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                        <option value="cargo" selected>Cargo</option>
                        <option value="seccion">Sección</option>
                        <option value="departamento">Departamento</option>
                        <option value="area">Área</option>
                    </select>
                </div>
            </div>

            <!-- Busqueda -->
            <form action="javascript:void(0);" oninput="app.busquedaEstructura()">
                <div class="relative mb-1">
                    <div class="absolute flex items-center h-full text-gray-500 pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </div>
                    <input type="search" id="busqueda-estructura" placeholder="Búsqueda..." class="block w-full rounded-md border-0 py-2.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm">
                </div>
            </form>
        </div>
        <div class="p-4 rounded-md mb-4">
            <!-- Tabla Estructura -->
            <table class="w-full text-xs md:text-sm text-left">
                <thead>
                    <tr class="h-14 border-b border-b-slate-400">
                        <th class="font-medium pr-4">ID</th>
                        <th class="font-medium pr-4">Cargo</th>
                        <th class="font-medium pr-4">Sección</th>
                        <th class="font-medium pr-4">Departamento</th>
                        <th class="font-medium pr-4">Área</th>
                        <th class="font-medium pr-4">Estado</th>
                        <th class="font-medium pr-4 text-right">Opciones</th>
                    </tr>
                </thead>
                <tbody id="tbodyEstructura">

                </tbody>
            </table>

            <!-- Paginacion -->
            <div id="paginacion" class="flex text-center mt-4 items-center">
            </div>

            <!-- Modal Editar -->
            <div id="modal-estructura">

            </div>
        </div>
    </div>

    <script src="../assets/scriptEstructura.js"></script>

<?php
    require '../template/footer.php';
} else {
    // No hay sesión, redicciona a login
    header('location: ../views/');
} ?>