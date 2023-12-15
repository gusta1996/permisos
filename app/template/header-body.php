<header class="bg-white shadow-sm w-full">
    <nav class="flex max-w-full items-center justify-between p-5 lg:px-8" aria-label="Global">
        <div class="lg:hidden flex flex-1">
            <a href="../views/" class="-m-1.5 p-1.5">
                <img class="h-8 w-auto" src="../../public/images/ElGuabo.png" alt="">
            </a>
        </div>
        <div class="hidden lg:flex flex-1">
            <h1 class="text-lg font-semibold leading-7 text-gray-900"><?php echo $title; ?></h1>
        </div>
        <div class="lg:hidden flex flex-1 justify-end">
            <a onclick="app.abrirMenu()" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
            </a>
        </div>
        <div class="flex items-center gap-4 ml-4 lg:flex-1 lg:justify-end">
            <div id="info" class="hidden">
                <div id="cuenta-id-funcionario"><?php echo $user->getIdFuncionario(); ?></div>
            </div>
            <a href="../views/perfil.php" class="hidden lg:flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-500">
                <?php echo $user->getNombres(); ?> <?php echo $user->getApellidos(); ?>

                <!-- Imagen de perfil -->
                <?php if ($user->getImagen() == null) : ?>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg>
                <?php else : ?>
                    <img src="data:image/jpeg;base64,<?php echo $user->getImagen(); ?>" class="rounded-full overflow-hidden w-8 h-8" />
                <?php endif; ?>
            </a>
            <a href="../models/logout.php" class="hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
                    <path d="M7.5 1v7h1V1h-1z" />
                    <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                </svg>
            </a>
        </div>
    </nav>
</header>