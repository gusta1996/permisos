<div id="lista-solicitud" class="bg-white rounded-md shadow-sm">
    <!-- Titulo -->
    <div class="border-b border-gray-900/10 p-4">
        <div class="flex items-center justify-between gap-6 mb-5">
            <!-- Titulo -->
            <h2 class="flex-auto text-lg font-semibold leading-7 text-gray-900">Lista de solicitudes</h2>
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
        <form action="javascript:void(0);" oninput="appSolicitud.busquedaSolicitud()">
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
            <!-- Tabla Solicitudes -->
            <table class="w-full text-xs md:text-sm text-left">
                <thead>
                    <tr class="border-b border-b-slate-400">
                        <th class="hidden font-medium py-4 pr-4">ID</th>
                        <th class="font-medium py-4 pr-4">No.</th>
                        <th class="font-medium py-4 pr-4">Nombres</th>
                        <th class="font-medium py-4 pr-4">Razón</th>
                        <th class="font-medium py-4 pr-4">Fecha</th>
                        <th class="font-medium py-4 pr-4">Estado</th>
                        <th class="font-medium py-4 pr-4 text-right">Opciones</th>
                    </tr>
                </thead>
                <tbody id="tbodySolicitud">

                </tbody>
            </table>

            <!-- Paginacion -->
            <div id="paginacion" class="flex text-center mt-4 items-center">
            </div>

            <!-- Modal Editar -->
            <div id="modal-solicitud">
            </div>
        </div>
    </div>
</div>

<div id="crear-solicitud" class="hidden bg-white rounded-md shadow-sm">
    <div class="border-b border-gray-900/10 p-4">
        <h2 class="text-lg font-semibold leading-7 text-gray-900">Crear solicitud</h2>
    </div>
    <!-- Formulario Solicitud -->
    <div class="p-4">
        <form action="javascript:void(0);" onsubmit="appSolicitud.guardarSolicitud()">
            <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <!-- Nombres Funcionario -->
                <div class="col-span-full">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Funcionario:</label>
                    <p class="text-xs leading-6 text-gray-600">Únicamente se incluyen funcionarios con cargos asignados.</p pr-4>
                    <div class="mt-2">
                        <select id="funcionario-solicitud" required class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                            <option value="" selected disabled>-- Selecciona --</option>
                        </select>
                    </div>
                </div>

                <!-- Fecha de Salida -->
                <div class="sm:col-span-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Fecha de salida:</label>
                    <div class="mt-2">
                        <input type="date" id="fecha-salida-solicitud" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <!-- Fecha de entrada -->
                <div class="sm:col-span-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Fecha de entrada:</label>
                    <div class="mt-2">
                        <input type="date" id="fecha-entrada-solicitud" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <!-- Hora de Salida -->
                <div class="sm:col-span-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Hora de salida:</label>
                    <div class="mt-2">
                        <input type="time" id="hora-salida-solicitud" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <!-- Hora de entrada -->
                <div class="sm:col-span-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Hora de entrada:</label>
                    <div class="mt-2">
                        <input type="time" id="hora-entrada-solicitud" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <!-- Razón -->
                <div class="col-span-full">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Razón:</label>
                    <div class="mt-2">
                        <div class="flex items-center mt-2">
                            <input type="radio" id="particular" name="razon-solicitud" value="Particular" class="mr-2">
                            <label for="particular" class="cursor-pointer">Particular</label>
                        </div>
                        <div class="flex items-center mt-2">
                            <input type="radio" id="calamidad_domestica" name="razon-solicitud" value="Calamidad domestica" class="mr-2">
                            <label for="calamidad_domestica" class="cursor-pointer">Calamidad domestica</label>
                        </div>
                        <div class="flex items-center mt-2">
                            <input type="radio" id="enfermedad" name="razon-solicitud" value="Enfermedad" class="mr-2">
                            <label for="enfermedad" class="cursor-pointer">Enfermedad</label>
                        </div>
                        <div class="flex items-center mt-2">
                            <input type="radio" id="otro" name="razon-solicitud" value="Otro" class="mr-2">
                            <label for="otro" class="cursor-pointer">Otro</label>
                        </div>
                    </div>

                </div>

                <!-- Observaciones -->
                <div class="col-span-full">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Observaciones:</label>
                    <div class="mt-2">
                        <textarea id="observacion-solicitud" rows="3" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"></textarea>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button type="submit" class="rounded-md bg-indigo-500 px-4 py-2 m-auto text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Crear</button>
            </div>
        </form>
    </div>
</div>

<script src="../assets/scriptSolicitudAdministrador.js"></script>