<?php
require_once '../models/estructura-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'tipo' => $_POST['tipo'],
    'pagina' => $_POST['pagina']
);

echo json_encode(Estructura::busquedaEstructura($arrayName));