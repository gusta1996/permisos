<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CDN: Tailwind solo para programacion  -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- 
    Tailwind para produccion (hay que actualizar)
    Comando actualizar: npx tailwindcss -i ./public/css/input.css -o ./dist/output.css --watch  

    COMANDOS GITHUB
    descargar archivos del repositorio: git pull origin master
    subir cambios al repositorio: git push origin master
    -->

    <link rel="stylesheet" href="../../dist/output.css">
    <link rel="stylesheet" href="../../public/css/style.css">
    <link rel="icon" href="../../public/images/favicon.png">

    <title><?php echo $title; ?></title>

    <!-- select2.css - jquery - select2.js -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

</head>

<body class="user-<?php echo $user->getRol(); ?> text-sm">

    <div id="notificacionContent" class="fixed z-50 flex flex-col gap-4 right-8 bottom-8 max-w-96 w-full">
    </div>

    <div class="flex min-h-screen bg-slate-100">
        <?php require '../template/navegacion.php'; ?>

        <div class="basis-full">
            <?php require '../template/header-body.php'; ?>
            <div class="max-w-6xl mt-4 mb-4 mx-auto p-4">