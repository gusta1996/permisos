<?php
require_once '../models/unidad-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'pagina' => $_POST['pagina']
);

echo json_encode(Unidad::busquedaUnidad($arrayName));