<div class="lg:hidden flex">
    <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
</div>

<a href="./funcionarios.php" class="flex items-center w-max gap-2 rounded-md shadow-sm bg-indigo-500 px-3 py-2 mb-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z" />
    </svg>Volver
</a>

<div id="crear-funcionario" class="bg-white rounded-md shadow-sm">
    <div class="border-b border-gray-900/10 p-4">
        <h2 class="text-lg font-semibold leading-7 text-gray-900">Crear funcionario</h2>
    </div>
    <!-- Formulario Funcionarios -->
    <div class="p-4">
        <form action="javascript:void(0);" onsubmit="appFuncionarios.guardarFuncionarios()">
            <!-- Datos personales -->
            <h3 class="text-center mb-4 text-base font-semibold leading-7 text-gray-900">Datos personales</h3>
            <div class="mb-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <!-- Nombres -->
                <div class="sm:col-span-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Nombres:</label>
                    <div class="mt-2">
                        <input type="text" required id="nombres-funcionarios" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <!-- Apellidos -->
                <div class="sm:col-span-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Apellidos:</label>
                    <div class="mt-2">
                        <input type="text" required id="apellidos-funcionarios" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <!-- Cédula -->
                <div class="sm:col-span-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Cédula:</label>
                    <div class="mt-2">
                        <input type="number" required id="cedula-funcionarios" maxlength="10" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <!-- Dirección -->
                <div class="sm:col-span-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Dirección:</label>
                    <div class="mt-2">
                        <input type="text" required id="direccion-funcionarios" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <!-- Teléfono -->
                <div class="sm:col-span-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Teléfono:</label>
                    <div class="mt-2">
                        <input type="number" required id="telefono-funcionarios" maxlength="10" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <!-- Email -->
                <div class="sm:col-span-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                    <div class="mt-2">
                        <input type="email" required id="email-funcionarios" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                </div>
            </div>

            <!-- Datos de usuario -->
            <h3 class="text-center mb-4 text-base font-semibold leading-7 text-gray-900">Datos de usuario</h3>
            <div class="mb-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <!-- usuario -->
                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Usuario:</label>
                    <div class="mt-2">
                        <input type="text" required id="usuario-funcionarios" class="uppercase block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <!-- contraseña -->
                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Contraseña:</label>
                    <div class="mt-2">
                        <input type="text" required id="password-funcionarios" pattern="^(?=.*[a-zA-Z])(?=.*\d).{6,}$" placeholder="Usar letras y números (min 6 digitos)" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <!-- Rol -->
                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Rol:</label>
                    <div class="mt-2">
                        <select id="rol-funcionarios" required class="selectBuscador h-[38px] capitalize block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                            <option value="" selected disabled>-- Selecciona --</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Información ocupacional -->
            <h3 class="text-center mb-4 text-base font-semibold leading-7 text-gray-900">Información ocupacional</h3>
            <div class="mb-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <!-- Contrato -->
                <div class="sm:col-span-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Contrato:</label>
                    <div class="mt-2">
                        <select id="contrato-funcionarios" required class="selectBuscador h-[38px] capitalize block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                            <option value="" selected disabled>-- Selecciona --</option>
                        </select>
                    </div>
                </div>

                <!-- Estructura -->
                <div class="sm:col-span-3">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Cargo:</label>
                    <div class="mt-2">
                        <select id="estructura-funcionarios" required class="selectBuscador h-[38px] capitalize block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                            <option value="" selected disabled>-- Selecciona: --</option>
                        </select>
                    </div>
                </div>

                <!-- Mensaje de error -->
                <div id="error-funcionarios" class="hidden sm:col-span-6">
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button type="submit" class="rounded-md bg-indigo-500 px-4 py-2 m-auto text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Crear</button>
            </div>
        </form>
    </div>
</div>

<script src="../assets/scriptFuncionarios.js"></script>