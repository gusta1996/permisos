<?php
require '../models/user.php';
require '../models/user_session.php';

$userSession = new UserSession();
$user = new User();

if ($userSession->userLoggedIn()) {
    // Hay sesión
    $user->setUser($userSession->getCurrentUser());
    $title = 'Reportes';
    require '../template/header.php'; ?>

    <!-- visor de pdf -->
    <div id="visor-reporte" class="hidden w-full relative z-[100]">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed w-screen inset-0 z-10 overflow-y-auto">
            <div class="flex w-full items-end justify-center px-4 py-8">
                <div class="max-w-[980px] w-full">
                    <div id="btn-reporte-pdf" class="flex gap-4 justify-end">

                    </div>
                    <div id="reporte-pdf" class="bg-white p-4 rounded-md w-full"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="lg:hidden flex">
        <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
    </div>

    <div class="bg-white rounded-md shadow-sm mb-6">
        <div class="flex items-center gap-6 p-4">
            <h2 class="flex-auto text-lg font-semibold leading-7 text-gray-900">Descargar reporte mensual:</h2>
            <form action="javascript:void(0);" onsubmit="appReporte.reporteMensualPDF()" class="flex items-center gap-4">
                <div class="w-52">
                    <select id="select-meses" required class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                        <!-- <option value="" selected="" disabled="" data-select2-id="select2-data-4-s8hd">-- Selecciona --</option> -->
                    </select>
                </div>

                <button type="submit" class="flex items-center w-max gap-2 rounded-md bg-indigo-500 px-4 py-2 m-auto text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                    </svg>Visualizar
                </button>
            </form>
        </div>
    </div>

    <div class="bg-white rounded-md shadow-sm">
        <!-- Titulo -->
        <div class="border-b border-gray-900/10 p-4">
            <div class="flex items-center justify-between gap-6 mb-5">
                <!-- Titulo -->
                <h2 class="flex-auto text-lg font-semibold leading-7 text-gray-900">Reporte</h2>
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
            <form action="javascript:void(0);" oninput="appReporte.busquedaReporte()">
                <div class="relative mb-1">
                    <div class="absolute flex items-center h-full text-gray-500 pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </div>
                    <input type="search" id="busqueda-reporte" placeholder="Búsqueda..." class="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm">
                </div>
            </form>
        </div>

        <div class="bg-white rounded-md shadow-sm mb-6">
            <div class="p-4 rounded-md mb-4">

                <!-- Tabla Reporte -->
                <table class="w-full text-xs md:text-sm text-left">
                    <thead>
                        <tr class="h-14 border-b border-b-slate-400">
                            <th class="hidden font-medium pr-4">ID</th>
                            <th class="font-medium pr-4">No.</th>
                            <th class="font-medium pr-4">Nombres</th>
                            <th class="font-medium pr-4">Razón</th>
                            <th class="font-medium pr-4">Fecha</th>
                            <th class="font-medium pr-4">Tiempo</th>
                            <th class="font-medium">Estado</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyReporte">
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
    <script src="../assets/scriptReporte.js"></script>

<?php
    require '../template/footer.php';
} else {
    // No hay sesión, redicciona a login
    header('location: ../views/');
} ?>