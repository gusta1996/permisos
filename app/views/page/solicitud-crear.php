<div class="lg:hidden flex">
    <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
</div>

<a href="./solicitud.php" class="flex items-center w-max gap-2 rounded-md shadow-sm bg-indigo-500 px-3 py-2 mb-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
    </svg>Volver
</a>

<div id="crear-solicitud" class="bg-white rounded-md shadow-sm">
    <div class="border-b border-gray-900/10 p-4">
        <h2 class="text-lg font-semibold leading-7 text-gray-900">Crear solicitud</h2>
    </div>
    <!-- Formulario Solicitud -->
    <div class="p-4">
        <form action="javascript:void(0);" onsubmit="appSolicitud.guardarSolicitud()">
            <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <?php if ($administrador) : ?>
                    <!-- Nombres Funcionario -->
                    <div class="col-span-full">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Funcionario:</label>
                        <p class="text-xs leading-6 text-gray-600">Únicamente se incluyen funcionarios con cargos asignados.</p pr-4>
                        <div class="mt-2">
                            <select id="select-id-funcionario-solicitud" required class="selectBuscador h-[38px] block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                <option value="" selected disabled>-- Selecciona --</option>
                            </select>
                        </div>
                    </div>
                <?php else : ?>
                    <!--  Funcionario solicitud de la cuenta -->
                    <div class="hidden col-span-full">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Funcionario:</label>
                        <div class="mt-2">
                            <input type="num" id="cuenta-id-funcionario-solicitud" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                <?php endif; ?>

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

<script src="../assets/scriptSolicitud.js"></script>