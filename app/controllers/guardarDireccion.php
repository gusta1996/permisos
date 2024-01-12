<?php
require_once '../models/direccion-model.php';
$arrayName = array(
    'detalle' => strtolower($_POST['detalle']),
    'proceso' => $_POST['proceso'],
    'estado' => 'activo'
);

echo json_encode(Direccion::guardarDireccion($arrayName));