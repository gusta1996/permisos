<?php
require_once '../models/area-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'pagina' => $_POST['pagina']
);

echo json_encode(Area::busquedaArea($arrayName));