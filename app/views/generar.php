<?php
require '../models/user.php';
require '../models/user_session.php';

$userSession = new UserSession();
$user = new User();

if ($userSession->userLoggedIn()) {
    // Hay sesión
    $user->setUser($userSession->getCurrentUser());
    $title = 'Generar PDF';
    require '../template/header.php'; ?>

    <!-- visor de pdf -->
    <div id="visor-pdf" class="hidden w-full relative z-[100]">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed w-screen inset-0 z-10 overflow-y-auto">
            <div class="flex w-full items-end justify-center px-4 py-8">
                <div class="max-w-[980px] w-full">
                    <div id="btn-generar-pdf" class="flex gap-4 float-right">

                    </div>
                    <div id="generar-pdf" class="w-full">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="lg:hidden flex">
        <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
    </div>

    <div class="flex items-center gap-2 bg-emerald-200 rounded-md shadow-sm mb-6 p-4 text-emerald-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
        <p>Solo se puede generar PDF de solicitudes aprobadas.</p>
    </div>

    <div class="bg-white rounded-md shadow-sm">
        <!-- Titulo -->
        <div class="border-b border-gray-900/10 p-4">
            <div class="flex items-center justify-between gap-6 mb-5">
                <!-- Titulo -->
                <h2 class="flex-auto text-lg font-semibold leading-7 text-gray-900">Generar PDF</h2>
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
            <form action="javascript:void(0);" oninput="appGenerar.busquedaGenerarPDF()">
                <div class="relative mb-1">
                    <div class="absolute flex items-center h-full text-gray-500 pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </div>
                    <input type="search" id="busqueda-solicitud" placeholder="Búsqueda..." class="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm">
                </div>
            </form>
        </div>

        <div class="bg-white rounded-md shadow-sm mb-6">
            <div class="p-4 rounded-md mb-4">

                <!-- Tabla Generar PDF -->
                <table class="w-full text-xs md:text-sm text-left">
                    <thead>
                        <tr class="h-14 border-b border-b-slate-400">
                            <th class="hidden font-medium pr-4">ID</th>
                            <th class="font-medium pr-4">No.</th>
                            <th class="font-medium pr-4">Nombres</th>
                            <th class="font-medium pr-4">Razón</th>
                            <th class="font-medium pr-4">Fecha</th>
                            <th class="font-medium pr-4 text-right">Opciones</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyGenerar">

                    </tbody>
                </table>

                <!-- Paginacion -->
                <div id="paginacion" class="flex text-center mt-4 items-center">
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.js"></script>
    <script src="../assets/scriptGenerar.js"></script>

<?php
    require '../template/footer.php';
} else {
    // No hay sesión, redicciona a login
    header('location: ../views/');
} ?>