<div class="lg:hidden flex">
    <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
</div>

<!-- Pagina cambiar contraseña -->
<div class="bg-white rounded-md shadow-sm mb-6">
    <!-- Titulo -->
    <div class="border-b border-gray-900/10 p-4">
        <h2 class="text-lg font-semibold leading-7 text-gray-900">Cambiar contraseña</h2>
    </div>

    <!-- contenido -->
    <form action="javascript:void(0);" onsubmit="app.actualizarContrasena()">
        <div class="grid grid-cols-3 gap-6 py-8 p-4 border-b border-gray-900/10">
            <!-- ID -->
            <div class="hidden">
                <label class="block text-sm font-medium leading-6 text-gray-900">Nombres:</label>
                <div class="mt-2">
                    <input type="num" required id="id-funcionario" value="<?php echo $user->getIdFuncionario(); ?>" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                </div>
            </div>

            <!-- Username -->
            <div class="hidden">
                <label class="block text-sm font-medium leading-6 text-gray-900">username:</label>
                <div class="mt-2">
                    <input type="text" required id="username" value="<?php echo $user->getUserName(); ?>" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                </div>
            </div>

            <!-- contraseña actual -->
            <div class="">
                <label class="block text-sm font-medium leading-6 text-gray-900">Contraseña actual:</label>
                <div class="mt-2">
                    <input type="password" required id="actual-contrasena" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                </div>
            </div>

            <!-- nueva contraseña -->
            <div class="">
                <label class="block text-sm font-medium leading-6 text-gray-900">Nueva contraseña:</label>
                <div class="mt-2">
                    <input type="password" required id="nueva-contrasena" autocomplete="new-password" pattern="^(?=.*[a-zA-Z])(?=.*\d).{6,}$" placeholder="Usar letras y números (min 6 digitos)" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                </div>
            </div>

            <!-- confirmar contraseña -->
            <div class="">
                <label class="block text-sm font-medium leading-6 text-gray-900">Confirmar contraseña:</label>
                <div class="mt-2">
                    <input type="password" required id="confirmar-contrasena" autocomplete="new-password" pattern="^(?=.*[a-zA-Z])(?=.*\d).{6,}$" placeholder="repetir nueva contraseña" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                </div>
            </div>
            <!-- Mensaje de error -->
            <div id="error-perfil" class="hidden sm:col-span-3">
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