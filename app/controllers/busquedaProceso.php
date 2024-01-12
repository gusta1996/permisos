<?php
require_once '../models/proceso-model.php';
$arrayName = array(
    'busqueda' => $_POST['busqueda'],
    'pagina' => $_POST['pagina']
);

echo json_encode(Proceso::busquedaProceso($arrayName));