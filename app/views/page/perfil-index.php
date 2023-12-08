<div class="lg:hidden flex">
    <h1 class="text-lg font-semibold leading-7 text-gray-900 mx-auto mt-2 mb-6 uppercase"><?php echo $title; ?></h1>
</div>

<!-- Pagina perfil -->
<div class="bg-white rounded-md shadow-sm mb-6">
    <!-- Titulo -->
    <div class="border-b border-gray-900/10 p-4">
        <h2 class="text-lg font-semibold leading-7 text-gray-900">Perfil</h2>
    </div>

    <!-- contenido -->
    <div class="grid grid-cols-3 gap-4 py-8 p-4 border-b border-gray-900/10">
        <div class="col-span-1">            
            <!-- Imagen de perfil -->
            <?php if ($user->getImagen() == null) : ?>
                <div class="flex justify-center">
                    <svg class="h-auto w-[75%] text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                    </svg>
                </div>
            <?php else: ?>
                <div class="m-auto mb-6 rounded-full overflow-hidden w-52 h-52">
                    <img src="data:image/jpeg;base64,<?php echo $user->getImagen(); ?>" class="object-cover w-full h-full" />
                </div>
            <?php endif; ?>

            <!-- Rol de usuario -->
            <p class="text-center mb-2 text-xl font-normal leading-7 text-gray-900"><?php echo $user->getUserName(); ?></p>
            <!-- Rol de usuario -->
            <p class="text-center mb-4 text-base font-bold leading-7 text-gray-900"><?php echo $user->getRol(); ?></p>
            <!-- Editar -->
            <div class="flex flex-col items-center gap-2 pt-4 border-t border-gray-100">
                <a href="./perfil.php?page=editar" class="text-base font-medium leading-7 text-indigo-500 hover:text-indigo-600">Editar perfil</a>
                <a href="./perfil.php?page=contrasena" class="text-base font-medium leading-7 text-indigo-500 hover:text-indigo-600">Cambiar contraseña</a>
            </div>
        </div>

        <div class="col-span-2">
            <!-- Datos personales -->
            <div class="px-4 sm:px-0">
                <h3 class="text-base font-semibold leading-7 text-gray-900">Información</h3>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Datos personales de la cuenta</p>
            </div>
            <div class="mt-6 border-t border-gray-100">
                <dl class="divide-y divide-gray-100">
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Nombres</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><?php echo $user->getNombres(); ?></dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Apellidos</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><?php echo $user->getApellidos(); ?></dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Cédula</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><?php echo $user->getCedula(); ?></dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Dirección</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><?php echo $user->getDireccion(); ?></dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Teléfono</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><?php echo $user->getTelefono(); ?></dd>
                    </div>
                    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Email</dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><?php echo $user->getEmail(); ?></dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</div>

<script src="../assets/scriptPerfil.js"></script>