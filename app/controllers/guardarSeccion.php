<?php
require_once '../models/seccion-model.php';
$arrayName = array(
    'detalle' => $_POST['detalle'],
    'estado' => 'Activo'
);

echo json_encode(Seccion::guardarSeccion($arrayName));