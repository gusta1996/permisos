<div id="lista-solicitud" class="bg-white rounded-md shadow-sm">
    <!-- Titulo -->
    <div class="border-b border-gray-900/10 p-4">
        <h2 class="text-lg font-semibold leading-7 text-gray-900">Lista de solicitudes</h2>
    </div>

    <div class="bg-white rounded-md shadow-sm mb-6">
        <div class="p-4 rounded-md mb-4">
            <!-- Tabla Solicitudes -->
            <table class="w-full text-sm text-left">
                <thead>
                    <tr class="h-14 border-b border-b-slate-400">
                        <th class="hidden font-medium pr-4">ID</th>
                        <th class="font-medium pr-4">No.</th>
                        <th class="font-medium pr-4">Razón</th>
                        <th class="font-medium pr-4">Fecha</th>
                        <th class="font-medium pr-4">Estado</th>
                        <th class="font-medium pr-4 text-right">Opciones</th>
                    </tr>
                </thead>
                <tbody id="tbodySolicitud">

                </tbody>
            </table>

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
                <div class="hidden col-span-full">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Funcionario:</label>
                    <div class="mt-2">
                        <input type="text" id="funcionario-solicitud" required value="<?php echo $user->getIdFuncionario(); ?>">
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

<script src="../assets/scriptSolicitudEstandar.js"></script>