<div class="lg:hidden flex">
    <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
</div>

<a href="./solicitud.php?page=crear" class="flex items-center w-max gap-2 rounded-md shadow-sm bg-indigo-500 px-3 py-2 mb-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
    </svg>Añadir solicitud
</a>

<div class="bg-white rounded-md shadow-sm">
    <!-- Titulo -->
    <div class="border-b border-gray-900/10 p-4">
        <div class="flex items-center justify-between gap-6">
            <!-- Titulo -->
            <h2 class="flex-auto text-lg font-semibold leading-7 text-gray-900">Lista de solicitudes</h2>

            <?php if ($administrador || $autorizador || $validador) : ?>
                <!-- Buscar por Tipo -->
                <h3 class="text-base font-medium leading-7 text-gray-900">Buscar por:</h3>
                <div class="w-52">
                    <select id="busqueda-tipo" class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm">
                        <option value="apellidos" selected>Apellidos</option>
                        <option value="nombres">Nombres</option>
                        <option value="cedula">Cédula</option>
                    </select>
                </div>
            <?php endif; ?>
        </div>
        <?php if ($administrador || $autorizador || $validador) : ?>
            <!-- Buscardor -->
            <form action="javascript:void(0);" oninput="appSolicitud.busquedaSolicitud()">
                <div class="relative mt-5 mb-1">
                    <div class="absolute flex items-center h-full text-gray-500 pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </div>
                    <input type="search" id="busqueda-solicitud" placeholder="Búsqueda..." class="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm">
                </div>
            </form>
        <?php endif; ?>
    </div>

    <div class="bg-white rounded-md shadow-sm mb-6">
        <div class="p-4 rounded-md mb-4">
            <!-- Tabla Solicitudes -->
            <?php if ($administrador) {
                $administrador = 'administrador';
                require './table/solicitud-tabla-completa.php';
            } elseif ($autorizador) {
                $autorizador = 'autorizador';
                require './table/solicitud-tabla-completa.php';
            } elseif ($validador) {
                $validador = 'validador';
                require './table/solicitud-tabla-completa.php';
            } else {
                require './table/solicitud-tabla-simple.php';
            } ?>

            <!-- Paginacion -->
            <div id="paginacion" class="flex text-center mt-4 items-center">
            </div>

            <!-- Modal Editar -->
            <div id="modal-solicitud">
            </div>
        </div>
    </div>
</div>

<script src="../assets/scriptSolicitud.js"></script>