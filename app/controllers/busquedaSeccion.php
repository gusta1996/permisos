<?php
require_once '../models/seccion-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'pagina' => $_POST['pagina']
);

echo json_encode(Seccion::busquedaSeccion($arrayName));