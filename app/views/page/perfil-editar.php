<div class="lg:hidden flex">
    <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
</div>

<!-- Pagina editar perfil -->
<div class="bg-white rounded-md shadow-sm mb-6">
    <!-- Titulo -->
    <div class="border-b border-gray-900/10 p-4">
        <h2 class="text-lg font-semibold leading-7 text-gray-900">Editar</h2>
    </div>

    <!-- contenido -->
    <form action="javascript:void(0);" onsubmit="app.actualizarPerfil()">
        <div class="grid grid-cols-3 gap-4 py-8 p-4 border-b border-gray-900/10">
            <div class="col-span-1">
                <!-- Imagen de perfil -->
                <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="col-span-full">
                        <label for="imagen-perfil" class="block text-base mb-6 font-semibold leading-7 text-gray-900">Imagen</label>

                        <div id="box-visualizar" class="<?php echo ($user->getImagen() == null) ? 'hidden ' : ''; ?>m-auto mb-6 rounded-full overflow-hidden w-52 h-52">
                            <img id="visualizar-imagen-perfil" src="data:image/jpeg;base64,<?php echo $user->getImagen(); ?>" class="object-cover w-full h-full" />
                        </div>

                        <div id="btn-eliminar-visualizar" class="<?php echo ($user->getImagen() == null) ? 'hidden ' : ''; ?>flex justify-center gap-x-3 mb-6">
                            <a href="javascript:app.eliminarImagenPerfil();" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Eliminar imagen</a>
                        </div>

                        <input type="file" id="imagen-perfil" name="imagen-perfil" accept="image/*">
                    </div>
                </div>
            </div>

            <div class="col-span-2">
                <!-- Datos personales -->
                <div class="px-4 sm:px-0">
                    <h3 class="text-base font-semibold leading-7 text-gray-900">Información</h3>
                    <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Datos personales de la cuenta</p>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <!-- ID -->
                    <div class="hidden sm:col-span-3">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Nombres:</label>
                        <div class="mt-2">
                            <input type="num" required id="id-funcionario" value="<?php echo $user->getIdFuncionario(); ?>" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <!-- Nombres -->
                    <div class="sm:col-span-3">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Nombres:</label>
                        <div class="mt-2">
                            <input type="text" required id="nombres-perfil" value="<?php echo $user->getNombres(); ?>" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <!-- Apellidos -->
                    <div class="sm:col-span-3">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Apellidos:</label>
                        <div class="mt-2">
                            <input type="text" required id="apellidos-perfil" value="<?php echo $user->getApellidos(); ?>" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <!-- Cédula -->
                    <div class="sm:col-span-3">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Cédula:</label>
                        <div class="mt-2">
                            <input type="text" required id="cedula-perfil" value="<?php echo $user->getCedula(); ?>" maxlength="10" pattern="[0-9]{10}" value="<?php echo $user->getCedula(); ?>" title="Por favor ingrese una cédula válida. Debe contener 10 dígitos." class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <!-- Dirección -->
                    <div class="sm:col-span-3">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Dirección:</label>
                        <div class="mt-2">
                            <input type="text" required id="direccion-perfil" value="<?php echo $user->getDireccion(); ?>" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <!-- Teléfono -->
                    <div class="sm:col-span-3">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Teléfono:</label>
                        <div class="mt-2">
                            <input type="number" required id="telefono-perfil" value="<?php echo $user->getTelefono(); ?>" maxlength="10" oninput="if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="sm:col-span-3">
                        <label class="block text-sm font-medium leading-6 text-gray-900">Email:</label>
                        <div class="mt-2">
                            <input type="email" required id="email-perfil" value="<?php echo $user->getEmail(); ?>" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                        </div>
                    </div>

                    <!-- Mensaje de error -->
                    <div id="error-perfil" class="hidden sm:col-span-6">
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-end gap-6 p-4">
            <!-- Botones -->
            <a href="./perfil.php" class="text-sm font-semibold leading-6 text-gray-900">Cancelar</a>
            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Guardar</button>
        </div>
    </form>
</div>

<script src="../assets/scriptPerfil.js"></script>