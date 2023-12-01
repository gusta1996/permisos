<?php
require '../models/user.php';
require '../models/user_session.php';

$userSession = new UserSession();
$user = new User();

if ($userSession->userLoggedIn()) {
    // Hay sesión
    $user->setUser($userSession->getCurrentUser());
    $title = 'Categorías';
    require '../template/header.php'; ?>

    <div class="lg:hidden flex">
        <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
    </div>

    <div class="bg-white rounded-md shadow-sm mb-6">
        <!-- Titulo -->
        <div class="border-b border-gray-900/10 p-4">
            <h2 class="text-lg font-semibold leading-7 text-gray-900">Agregar categoría</h2>
        </div>
        <!-- Formulario Categoria -->
        <div class="p-4">
            <form action="javascript:void(0);" onsubmit="app.guardarCategoria()">
                <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
                    <!-- Detalle -->
                    <div class="sm:col-span-4">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Detalle:</label>
                        <div class="mt-2">
                            <input type="text" required id="detalle-categoria" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <div class="mt-auto">
                        <button type="submit" class="w-full rounded-md bg-indigo-500 px-4 py-2 m-auto text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Crear</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="bg-white rounded-md shadow-sm mb-6">
        <!-- Titulo -->
        <div class="border-b border-gray-900/10 p-4">
            <h2 class="text-lg font-semibold leading-7 text-gray-900 mb-2">Buscar categoría</h2>
            <form action="javascript:void(0);" oninput="app.busquedaCategoria()">
                <div class="relative mb-1">
                    <div class="absolute flex items-center h-full text-gray-500 pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </div>
                    <input type="search" id="busqueda-categoria" placeholder="Búsqueda..." class="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm">
                </div>
            </form>
        </div>
        <div class="p-4 rounded-md mb-4">
            <!-- Tabla Categoria -->
            <table class="w-full text-xs md:text-sm text-left">
                <thead>
                    <tr class="h-14 border-b border-b-slate-400">
                        <th class="font-medium pr-4">ID</th>
                        <th class="font-medium pr-4">Detalle</th>
                        <th class="font-medium pr-4">Estado</th>
                        <th class="font-medium pr-4 text-right">Opciones</th>
                    </tr>
                </thead>
                <tbody id="tbodyCategoria">

                </tbody>
            </table>

            <!-- Paginacion -->
            <div id="paginacion" class="flex text-center mt-4 items-center">
            </div>
            
            <!-- Modal Editar -->
            <div id="modal-categoria">
            </div>
        </div>
    </div>

    <script src="../assets/scriptCategoria.js"></script>

<?php
    require '../template/footer.php';
} else {
    // No hay sesión, redicciona a login
    header('location: ../views/');
} ?>