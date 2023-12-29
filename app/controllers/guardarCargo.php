<?php
require_once '../models/cargo-model.php';
$arrayName = array(
    'detalle' => strtolower($_POST['detalle']),
    'seccion' => $_POST['seccion'],
    'estado' => 'activo'
);

echo json_encode(Cargo::guardarCargo($arrayName));