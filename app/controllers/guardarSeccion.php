<?php
require_once '../models/seccion-model.php';
$arrayName = array(
    'detalle' => strtolower($_POST['detalle']),
    'departamento' => $_POST['departamento'],
    'estado' => 'activo'
);

echo json_encode(Seccion::guardarSeccion($arrayName));