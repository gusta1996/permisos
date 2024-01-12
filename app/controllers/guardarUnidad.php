<?php
require_once '../models/unidad-model.php';
$arrayName = array(
    'detalle' => strtolower($_POST['detalle']),
    'direccion' => $_POST['direccion'],
    'estado' => 'activo'
);

echo json_encode(Unidad::guardarUnidad($arrayName));