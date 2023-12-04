<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Tailwind -->
    <link rel="stylesheet" href="../../dist/output.css">
    <link rel="stylesheet" href="../../public/css/style.css">
    <title>Sistema de Gestión de Permisos</title>
</head>

<body class="font-[sans-serif] text-sm">
    <div style="background-image: url('../../public/images/municipio_del_guabo.png');" class="bg-center bg-cover bg-no-repeat flex items-center justify-center min-h-screen bg-slate-100">
        <div class="fixed inset-0 bg-black bg-opacity-25 z-10"></div>

        <!-- Login-->
        <div class="w-full sm:w-auto py-6 px-4 z-20">
            <div class="flex flex-col justify-center mx-auto max-w-md bg-white p-6 sm:p-10 rounded-md shadow-lg">
                <div class="sm:mx-auto w-full md:w-80">
                    <img class="mx-auto h-20 w-auto" src="../../public/images/ElGuabo.png" alt="GAD El Guabo">
                    <h2 class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Iniciar sesión</h2>
                    <?php if (isset($errorLogin)) : ?>
                        <p class="text-red-600 mt-4"><?php echo $errorLogin; ?></p>
                    <?php endif; ?>
                </div>

                <div class="sm:mx-auto w-full md:w-80">
                    <form class="space-y-6" action="" method="POST">
                        <div>
                            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Usuario</label>
                            <div class="mt-2">
                                <input id="username" name="username" type="text" autocomplete="username" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                                <div class="text-sm">
                                    <a href="#" class="font-semibold text-indigo-500 hover:text-indigo-600">¿Has olvidado tu contraseña?</a>
                                </div>
                            </div>
                            <div class="mt-2">
                                <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                            </div>
                        </div>

                        <div>
                            <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Iniciar sesión</button>
                        </div>
                    </form>

                    <p class="mt-10 text-center text-sm text-gray-500">
                        ¿No tienes cuenta?
                        <a href="#" class="font-semibold leading-6 text-indigo-500 hover:text-indigo-600">Registrate</a>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <script src="../assets/app.js"></script>
</body>

</html>